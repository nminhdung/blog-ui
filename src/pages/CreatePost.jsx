import { FileInput, Select, TextInput, Button } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm();
    useEffect(() => {
        register('postContent', { required: true });
    }, [register])
    const onEditorStateChange = (editorState) => {
        setValue("postContent", editorState);
        console.log(editorState);
    };
    const editorContent = watch('postContent');
    return (
        <div className='max-w-3xl mx-auto min-h-screen p-3'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Create Post</h1>
            <form className='flex flex-col gap-4'>
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
                    <FileInput type='file' accept='image/*' />
                    <Button type='button' gradientDuoTone='purpleToBlue' outline>Upload</Button>
                </div>
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