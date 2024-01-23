
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import welcomeImg from '../assets/images/welcome.jpg';
import { Link } from 'react-router-dom';
import { signUpAPI } from '../apis';
import { HiInformationCircle } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Signup = () => {

  const { register, handleSubmit, formState: { errors }, } = useForm();
  const [errorMessages, setErrorMessages] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async(data) => {
    console.log(data);
 
    try {
      setLoading(true);
      setErrorMessages(null);
      const res = await signUpAPI(data);
      if (!res.result === null) {
        setErrorMessages('Can not sign up');
        return;
      }
      setLoading(false);
      setErrorMessages(null);
      toast.success('Sign up successfully');
    } catch (error) {
      setErrorMessages('Email existed or email invalid');
      setLoading(false);
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
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div>
            <Label value='Your username' />
            <TextInput
              type='text'
              placeholder='Username'
              id='username'
              {...register("username", { required: 'Username is required' })}

            />
            {errors.username && <span className='text-sm text-red-500'>{errors.username?.message}</span>}

          </div>
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
              {...register("password", { required: 'Password is required', minLength: 8, maxLength: 18 })}
            />
            {errors.password && <span className='text-sm text-red-500'>{errors.password?.message}</span>}

          </div>
          <Button gradientDuoTone='purpleToPink' type='submit' className='mt-4' disabled={loading}>
            {loading ? <>
              <Spinner sm='sm' />
              <span className='pl-3'>Loading</span>
            </> : 'Sign Up'}
          </Button>
        </form>
        <div className='flex gap-2 mt-5'>
          <span>Have an account?</span>
          <Link to='/sign-in' className='text-blue-500 hover:underline'>Sign In</Link>
        </div>
        {errorMessages && <Alert className='mt-5' color="failure" icon={HiInformationCircle}>
          {errorMessages}
        </Alert>}
      </div>
    </div>
  );
};

export default Signup;