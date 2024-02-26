import React, { useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';
import Swal from 'sweetalert2';
import { deleteCommentPostAPI, editCommentPostAPI } from '../apis';
import { toast } from 'react-toastify';

const Comment = ({ comment, postId, render }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [editedContent, setEditedContent] = useState(comment?.content || '');
    const { currentUser } = useSelector(state => state.user)

    const handleDelete = async (postId, commentId) => {
        Swal.fire({
            title: "Are you sure",
            text: "Do you want to remove this comment",
            icon: "warning",
            showCancelButton: true,
        }).then(async (rs) => {
            if (rs.isConfirmed) {
                const res = await deleteCommentPostAPI(postId, { commentId });
                if (res.success) {
                    toast.success(res.mes);
                    render();
                }
            } else {
                toast.error(res.mes);
            }
        })
    }
    const handleSave = async (commentId) => {

        try {

            const res = await editCommentPostAPI(postId, { commentId: commentId, content: editedContent, updatedAt: moment(Date.now()) })

            if (res.status) {
                toast.success('Updated successfully');
                render();
                setIsEdit(false);

            }
        } catch (error) {
            toast.error(error)
        }
    }
    return (
        <div className='p-3  border-b border-[#555c6a] flex items-center gap-2 mt-7'>
            <img src={comment?.postedBy?.avatar} alt='avatar' className='w-10 h-10 object-cover rounded-full' />
            <div className='flex-1'>
                <p className='flex items-center gap-2'>
                    @{comment?.postedBy?.username}
                    <span className='text-[#555c6a] text-xs'>{moment(comment?.updatedAt).fromNow()}</span>
                </p>

                {isEdit ? (
                    <>
                        <Textarea
                            className='mb-2'
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <div className='flex justify-end gap-2 text-xs'>
                            <Button
                                type='button'
                                size='sm'
                                gradientDuoTone='purpleToBlue'
                                onClick={() => handleSave(comment?._id)}
                            >
                                Save
                            </Button>
                            <Button
                                type='button'
                                size='sm'
                                gradientDuoTone='purpleToBlue'
                                outline
                                onClick={() => setIsEdit(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className='text-[#555c6a] mb-2'>{comment?.content}</p>
                        <div className='flex items-center pt-1 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
                            {currentUser && (currentUser._id === comment?.postedBy?._id || currentUser.isAdmin) && (
                                <>
                                    <button
                                        type='button'
                                        className='text-gray-400 hover:text-blue-500'
                                        onClick={() => setIsEdit(true)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type='button'
                                        className='text-gray-400 hover:text-red-500'
                                        onClick={() => handleDelete(postId, comment._id)}
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>

                    </>
                )}
            </div>


        </div>
    )
};

export default Comment;