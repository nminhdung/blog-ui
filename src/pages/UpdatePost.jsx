import { FileInput, Select, TextInput, Button, Alert } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getPostAPI, updatePostAPI } from '../apis';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { moduleEditor } from '../utils/formatters';

const UpdatePost = () => {
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

    const { postId } = useParams();
    const [showImageUploaded, setShowImageUploaded] = useState(false);

    const [postData, setPostData] = useState(null);
    console.log('🚀 ~ UpdatePost ~ postData:', postData)

    const [file, setFile] = useState(null);

    const [filePercent, setFilePercent] = useState(0);

    const [fileUploadError, setFileUploadError] = useState(null);

    const navigate = useNavigate()

    

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setShowImageUploaded(false);
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

        try {
            const res = await updatePostAPI(postId, { ...data, image: file });
            if (!res.success) {
                toast.error('Can not create post with some problems');
            }
            toast.success(res.mes);

            setFile(null);
            setShowImageUploaded(false);
            navigate('/dashboard?tab=posts');

        } catch (error) {
            toast.error(res.mes);
        }
    };

    useEffect(() => {
        const fetchPost = async () => {
            const res = await getPostAPI(postId);
            setPostData(res.result);

        }
        fetchPost();
    }, [postId]);
    useEffect(() => {
        if (postData) {
            setValue('title', postData.title);
            setValue('postContent', postData.content);
            setValue('category', postData.category);
            setFile(postData.image);
            setShowImageUploaded(true)
        }
    }, [postData])
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
    };

    const editorContent = watch('postContent');

    return (
        <div className='max-w-3xl mx-auto min-h-screen p-3'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Update Post</h1>
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
                    modules={moduleEditor}
                    value={editorContent}
                    onChange={onEditorStateChange}
                    className='h-[500px] mb-12'
                />
                {errors.postContent && <span className='text-sm text-red-500'>{errors.postContent?.message}</span>}
                <Button type='submit' gradientDuoTone='purpleToBlue' >Update</Button>
            </form>
        </div>
    )
};

export default UpdatePost;