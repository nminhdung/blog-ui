import { FileInput, Select, TextInput, Button, Alert } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createPostAPI } from '../apis';
import { toast } from 'react-toastify';

const CreatePost = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState,
        formState: { errors },
        formState: { isSubmitSuccessful }
    } = useForm();

    const [showImageUploaded, setShowImageUploaded] = useState(false);

    const [file, setFile] = useState(null);

    const [filePercent, setFilePercent] = useState(0);

    const [fileUploadError, setFileUploadError] = useState(null);

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        if (imageFile) {
            setFile(imageFile);
        }
    }

    const handleImageUpload = async () => {

        try {
            if (!file) {
                setFileUploadError("Please choose your image");
                return;
            }
            console.log(123);
            const storage = getStorage(app);

            const fileName = new Date().getTime() + file.name;

            const storageRef = ref(storage, fileName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setFilePercent(Math.round(progress));
                },
                (error) => {
                    setFileUploadError(error);
                    setFile(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setFile(downloadURL);
                        setShowImageUploaded(true);
                        setFileUploadError(null);
                        setFilePercent(null)
                    });
                }
            );
        } catch (error) {
            setFileUploadError("Something went wrong!");
        }
    }

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const res = await createPostAPI({ ...data, image: file });
            if (!res.success) {
                toast.error('Can not create post with some problems');
            }
            toast.success('Created successfully');
            setFile(null);
            setShowImageUploaded(false);
        } catch (error) {
            toast.error('Something went wrong!!!');
        }
    };

    useEffect(() => {
        register('postContent', { required: true });
    }, [register]);

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ title: '', postContent: '', category: 'uncategorized' });
        }
    }, [formState, reset]);

    const onEditorStateChange = (editorState) => {
        setValue("postContent", editorState);
        console.log(editorState);
    };

    const editorContent = watch('postContent');

    return (
        <div className='max-w-3xl mx-auto min-h-screen p-3'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Create Post</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <TextInput placeholder='Title' id='title'
                        {...register('title', {
                            required: 'Title is required',

                        })} />
                    {errors.title && <span className='text-sm text-red-500'>{errors.title?.message}</span>}
                </div>
                <Select {...register('category')}>
                    <option value="uncategorized">Select a category</option>
                    <option value="reactjs">React.js</option>
                    <option value="nextjs">Next.js</option>
                    <option value="javascript">Javascript</option>
                </Select>
                <div className='flex items-center justify-between p-3 border border-teal-500   '>
                    <FileInput type='file' accept='image/*' onChange={handleImageChange} />
                    {filePercent ?
                        <h1>Loading...</h1> :
                        <Button type='button' gradientDuoTone='purpleToBlue' outline onClick={handleImageUpload}>Upload</Button>
                    }
                </div>
                {fileUploadError && <Alert color='failure'>
                    {fileUploadError}
                </Alert>}
                {file && showImageUploaded ? <img src={file} alt='upload' className='w-full h-[500px] object-cover' /> : ""}
                <ReactQuill
                    theme="snow"
                    placeholder="Write something ...."
                    value={editorContent}
                    onChange={onEditorStateChange}
                    className='h-[500px] mb-12'
                />
                {errors.postContent && <span className='text-sm text-red-500'>{errors.postContent?.message}</span>}
                <Button type='submit' gradientDuoTone='purpleToBlue' >Publish</Button>
            </form>
        </div>
    )
};

export default CreatePost;