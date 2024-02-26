import { Button, Textarea } from 'flowbite-react';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { commentPostAPI } from '../apis';
import Comment from './Comment';

const CommentSection = ({ postId, comments, render }) => {
    const { currentUser } = useSelector(state => state.user)
    const [comment, setComment] = useState('');

    const handleSubmit = async () => {
        if (comment.length > 200) {
            return;
        }
        try {
            const res = await commentPostAPI(postId, { comment, updatedAt: Date.now() });
            if (res.success) {
                setComment('');
                render();
            } else {
                toast.error(res.mes);
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {currentUser ? (
                <div className='flex items-center gap-2 my-7'>
                    <p className='text-gray-500 text-sm'>Signed in as:</p>
                    <img src={currentUser.avatar} alt="avatar" className='w-5 h-5 object-cover rounded-full' />
                    <Link to={`/dashboard?tab=profile`} className='text-cyan-300 text-xs hover:underline'>@{currentUser.username}</Link>
                </div>
            ) : (
                <div className='flex items-center gap-1 text-cyan-400'>

                    <Link to={'/sign-in'} className='text-blue  -500 hover:underline'>Sign In</Link>
                    to comment for post
                </div>
            )}
            {currentUser && (
                <div className='p-4 border border-teal-300 rounded-md my-5' >
                    <Textarea
                        placeholder='Add your comments'
                        rows={3}
                        maxLength='200'
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div className='flex items-center justify-between mt-5'>
                        <p>200 characters remaining</p>
                        <Button
                            type='button'
                            gradientDuoTone={'purpleToBlue'}
                            outline
                            disabled={!comment}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            )}
            {comments?.length === 0 ?
                <p className='text-sm my-5'>No comments yet</p> :
                <div className=''>
                    <p className='flex items-center gap-2'>Comments:
                        <span className='inline-block px-2 py-1 border border-gray-500 rounded-sm'>{comments?.length}</span>
                    </p>
                    <div className='mt-7'>
                        {comments && comments.map((comment) => {
                            return <Comment
                                comment={comment}
                                key={comment._id}
                                postId={postId}
                                render={render}

                            />
                        })}
                    </div>
                </div>
            }
        </div>
    );
};

export default CommentSection;