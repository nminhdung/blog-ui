import { Button, TextInput } from 'flowbite-react';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useForm } from 'react-hook-form';
import { updateFailed, updateSuccess, updateUserPending } from '../redux/user/userSlice';
import { updateProfileAPI } from '../apis';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const DashProfile = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [imageFile, setImageFile] = useState(null);
    const [imageFileURL, setImageFileURL] = useState(null);
    const [filePercent, setFilePercent] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(null);
    const fileRef = useRef(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileURL(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data) => {

        if (data.password.trim() === '') {
            delete data['password'];
        }
        try {
            dispatch(updateUserPending());
            const res = await updateProfileAPI({ ...data, avatar: imageFile ? imageFile : currentUser.avatar }, currentUser._id);
            if (!res.sucess) {
                dispatch(updateFailed('Somethings went wrong!!!'));
            };
            dispatch(updateSuccess(res.result));
            toast.success('Updated successfully');

        } catch (error) {
            dispatch(updateFailed('Somethings went wrong!!!'));
        }
    }
    const uploadImage = async () => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePercent(Math.round(progress));
            },
            (error) => {
                setFileUploadError(error);
                setImageFile(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileURL(downloadURL);
                    setImageFile(downloadURL);
                });
            }
        );
    }
    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile])
    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='text-center my-7 font-semibold text-3xl'>
                Profile
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                <input type='file' accept='image/*' onChange={handleImageChange} ref={fileRef} hidden />
                <div className='w-32 h-32 self-center cursor-pointer' onClick={() => fileRef.current.click()}>
                    <img src={imageFileURL || currentUser?.avatar} alt='user'
                        className='rounded-full w-full h-full object-cover border-8 border-green-300'

                    />

                </div>
                <TextInput
                    id='username'
                    type='text'
                    placeholder='username'
                    defaultValue={currentUser.username}
                    {...register("username", { required: 'Username is required' })}
                />
                {errors.username && <span className='text-sm text-red-500'>{errors.username?.message}</span>}
                <TextInput
                    id='email'
                    type='email'
                    placeholder='email'
                    defaultValue={currentUser.email}
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Please enter a valid email',
                        },
                    })}

                />
                {errors.email && <span className='text-sm text-red-500'>{errors.email?.message}</span>}

                <TextInput
                    id='password'
                    type='password'
                    placeholder='password'
                    {...register("password", {
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

                <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
                {currentUser.isAdmin && <Link to={'/create-post'}>
                    <Button gradientDuoTone='purpleToPink' type='button' className='w-full'>Create post</Button>
                </Link>}
            </form>
        </div>
    )
};

export default DashProfile;