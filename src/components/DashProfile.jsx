import { Button, TextInput } from 'flowbite-react';
import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';


const DashProfile = () => {
    const { currentUser } = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileURL, setImageFileURL] = useState(null);
    const [filePercent, setFilePercent] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(null);
    console.log(filePercent)
    const fileRef = useRef(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileURL(URL.createObjectURL(file));
        }
    };
    const uploadImage = async() => {
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
                });
            }
        );
    }
    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='text-center my-7 font-semibold text-3xl'>
                Profile
            </h1>
            <form className='flex flex-col gap-2'>
                <input type='file' accept='image/*' onChange={handleImageChange} ref={fileRef} hidden />
                <div className='w-32 h-32 self-center cursor-pointer' onClick={() => fileRef.current.click()}>
                    <img src={imageFileURL || currentUser?.avatar} alt='user'
                        className='rounded-full w-full h-full object-cover border-8 border-green-300'

                    />
                    
                </div>
                <Button className='w-fit self-center' gradientDuoTone='purpleToBlue' onClick={uploadImage}>Upload</Button>
                <TextInput
                    id='username'
                    type='text'
                    placeholder='username'
                    defaultValue={currentUser.username}

                />
                <TextInput
                    id='email'
                    type='email'
                    placeholder='email'
                    defaultValue={currentUser.email}
                />
                <TextInput
                    id='password'
                    type='password'
                    placeholder='password'
                />
                <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
            </form>
        </div>
    )
};

export default DashProfile;