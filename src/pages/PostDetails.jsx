import { Button, Spinner } from 'flowbite-react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPostAPI, getPostsAPI } from '../apis';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';

const PostDetails = () => {
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(false);
    const [recentPosts, setRecentPosts] = useState([]);
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
    const fetchRecentPosts = async () => {
        try {
            const res = await getPostsAPI('limit=3');
            if (res.success) {
                setRecentPosts(res.result);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchPost();
    }, [pid, refetch])
    useEffect(() => {
        fetchRecentPosts();
    }, [])
    if (loading) {
        return <div className='flex justify-center items-center min-h-screen'>
            <Spinner size='xl' />
        </div>
    }
    return (
        <>
            <div className="min-h-screen flex flex-col p-3 max-w-[800px] mx-auto">
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
            <div className='flex flex-col justify-center items-center mb-5'>
                <h1 className='text-xl mt-5'>Recent posts</h1>
                <div className='flex flex-wrap gap-5 mt-5 justify-center'>
                    {
                        recentPosts && recentPosts.map(post => {
                            return <PostCard key={post._id} post={post} />
                        })
                    }
                </div>
            </div>
        </>
    );
};

export default PostDetails;