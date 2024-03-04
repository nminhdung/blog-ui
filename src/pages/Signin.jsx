import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import welcomeImg from '../assets/images/welcome.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { signInAPI } from '../apis';
import { HiInformationCircle } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { signInPending, signInSuccess, signInFailed } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Oauth from '../components/Oauth';

const Signin = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const { loading, error } = useSelector(state => state.user)


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    console.log(data);

    try {
      dispatch(signInPending());

      const res = await signInAPI(data);
      if (!res.result === null) {
        dispatch(signInFailed(res.message));
        return;
      }
      dispatch(signInSuccess({
        userData: res.result,
        token: res.accessToken
      }));
      navigate('/')
      toast.success('Sign up successfully');
    } catch (error) {
      dispatch(signInFailed(error.message));
    }
  };
  return (
    <div className='mt-20 p-3 xl:max-w-[1200px]  mx-auto flex flex-col md:flex-row gap-4 '>
      {/* left side */}
      <div className="md:w-[500px] max-h-[300px] w-full">
        <img src={welcomeImg} className='w-full h-full object-cover' alt='welcome' />
      </div>
      {/* right side */}
      <div className='flex-1 w-full'>
        <div className='flex flex-col gap-1 mb-10 text-center'>
          <p className='font-bold'>Admin account : <span className='font-medium'>admin@gmail.com</span></p>
          <p className='font-bold'>Admin password :<span className='font-medium'>123123123</span> </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

          <div>
            <Label value='Your email' />
            <TextInput
              placeholder='Email'
              id='email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email',
                },
              })}
            />
            {errors.email && <span className='text-sm text-red-500'>{errors.email?.message}</span>}
          </div>
          <div>
            <Label value='Your password' />
            <TextInput
              type='password'
              placeholder='Passowrd'
              id='password'
              {...register("password", {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password at least 8 characters long'
                },
                maxLength: {
                  value: 18,
                  message: 'Password maximum 8 characters'
                }
              })}
            />
            {errors.password && <span className='text-sm text-red-500'>{errors.password?.message}</span>}

          </div>
          <Button gradientDuoTone='purpleToPink' type='submit' className='mt-4' disabled={loading}>
            {loading ? <>
              <Spinner sm='sm' />
              <span className='pl-3'>Loading</span>
            </> : 'Sign In'}
          </Button>
          <Oauth />
        </form>
        <div className='flex gap-2 mt-5'>
          <span>Have an account?</span>
          <Link to='/sign-up' className='text-blue-500 hover:underline'>Sign Up</Link>
        </div>
        {error && <Alert className='mt-5' color="failure" icon={HiInformationCircle}>
          {error}
        </Alert>}
      </div>
    </div>
  );
};

export default Signin;