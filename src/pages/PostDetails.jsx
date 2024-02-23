import { Button, Spinner } from 'flowbite-react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPostAPI } from '../apis';
import CommentSection from '../components/CommentSection';

const PostDetails = () => {
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(false);
    const [err, setError] = useState('');
    const [refetch, setRefetch] = useState(false);
    const { pid } = useParams();

    const reRender = () => {
        setRefetch(!refetch);
    }
    const fetchPost = async () => {
        setLoading(true);
        const res = await getPostAPI(pid);
        if (res.success) {
            setPost(res.result);
            setLoading(false);
        } else {
            setError(res.mes);
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchPost();
    }, [pid, refetch])
    if (loading) {
        return <div className='flex justify-center items-center min-h-screen'>
            <Spinner size='xl' />
        </div>
    }
    return (
        <div className="min-h-screen flex flex-col p-3 max-w-[600px] mx-auto">
            <h1 className='text-3xl mt-10 p-3 text-center lg:text-4xl font-serif font-semibold'>
                {post && post.title}
            </h1>
            <Link to={`/search?category=${post?.category}`} className='self-center mt-4'>
                <Button outline gradientDuoTone='purpleToBlue' size='xs'>{post && post.category}</Button>
            </Link>
            <img
                src={post?.image}
                alt={post?.title}
                className='w-full max-h-[500px] object-cover mt-10 border border-white'
            />
            <div className='flex items-center justify-between p-3 border-b border-slate-500'>
                <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span>{post && (post?.content.length / 1000).toFixed(0)} mins read</span>
            </div>
            <div className='p-3 max-w-2xl mx-auto w-full' dangerouslySetInnerHTML={{ __html: post && post.content }}></div>
            <CommentSection postId={post?._id} comments={post?.comments} render={reRender} />
        </div>

    );
};

export default PostDetails;