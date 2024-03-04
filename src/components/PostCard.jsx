import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
    return (
        <div className=' shadow-xl dark:shadow-md-light rounded-md overflow-hidden flex flex-col max-w-[400px] '>
            <Link to={`/post/${post?._id}`}>
                <img
                    src={post?.image} alt={post?.title}
                    className='h-[260px] w-full object-cover '
                />
            </Link>
            <div className='flex flex-col gap-2 p-3 flex-1 '>
                <p className='text-xl font-semibold line-clamp-2'>{post?.title}</p>
                <span className='italic text-sm'>{post?.category}</span>
                <p className='line-clamp-3' dangerouslySetInnerHTML={{ __html: post && post?.content }}></p>
                <Link to={`/post/${post?._id}`} className='border border-teal-500 
                py-2 w-full rounded-md hover:bg-teal-500 hover:border-white
                 hover:text-white transition-all duration-300 text-center mt-auto'>
                    Read more
                </Link>
            </div>
        </div>
    )
};

export default PostCard;