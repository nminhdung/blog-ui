import React from 'react';
import moment from 'moment';

const Comment = ({ comment }) => {
    return (
        <div className='p-3  border-b border-[#555c6a] flex items-center gap-2 mt-7'>
            <img src={comment?.postedBy.avatar} alt='avatar' className='w-10 h-10 object-cover rounded-full' />
            <div className=''>
                <p className='flex items-center gap-2'>
                    @{comment?.postedBy.username}
                    <span className='text-[#555c6a] text-xs'>{moment(comment?.updatedAt).fromNow()}</span>
                </p>
                <p className='text-[#555c6a]'>{comment?.content}</p>
            </div>
        </div>
    )
};

export default Comment;