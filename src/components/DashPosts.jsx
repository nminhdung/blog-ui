import { Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { deletePostAPI, getPostsAPI } from '../apis';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import { toast } from 'react-toastify';

const DashPosts = () => {
    const [posts, setPosts] = useState([]);
    const { currentUser } = useSelector(state => state.user)
    const [reFetch, setRefetch] = useState(false)
    const fetchPosts = async () => {
        const res = await getPostsAPI(`userId=${currentUser._id}`)
        if (res.success) {
            setPosts(res.result)
        }
    }
    const render = () => {
        console.log('re-fetch')
        setRefetch(!reFetch);
    }
    const handleDelete = async (postId) => {
        Swal.fire({
            title: "Are you sure",
            text: "Do you want to remove this post",
            icon: "warning",
            showCancelButton: true,
        }).then(async (rs) => {
            if (rs.isConfirmed) {
                const res = await deletePostAPI(postId);
                if (res.success) {
                    toast.success(res.mes);
                    render();
                }
            } else {
                toast.error(res.mes);
            }
        })
    }
    useEffect(() => {
        fetchPosts();
    }, [reFetch])
    return (
        <div className='table-auto md:mx-auto overflow-x-scroll mt-3 
        scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {currentUser.isAdmin && posts.length > 0 ? (
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Date Updated</Table.HeadCell>
                        <Table.HeadCell>Post image</Table.HeadCell>
                        <Table.HeadCell>Post Title</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                        <Table.HeadCell>Edit</Table.HeadCell>
                        <Table.HeadCell>Delete</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className='divide-y'>
                        {posts.map(post => {
                            return <Table.Row key={post._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                <Table.Cell
                                    className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                                    {new Date(post.updatedAt).toLocaleString()}
                                </Table.Cell>
                                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                                    <Link to={`/post/slug/${post.slug}`}>
                                        <img src={post.image} alt={post.title} className='w-20 h-10 object-cover' />
                                    </Link>
                                </Table.Cell>
                                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                                    <Link to={`/post/slug/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </Table.Cell>
                                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                                    {post.category}
                                </Table.Cell>
                                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                                    <Link to={`/update-post/${post._id}`}>
                                        <span className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                                        >
                                            Edit
                                        </span>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                                    <span className="font-medium text-red-500 hover:underline dark:text-red-600 cursor-pointer"
                                        onClick={() => handleDelete(post._id)}
                                    >
                                        Delete
                                    </span>
                                </Table.Cell>
                            </Table.Row>
                        })}
                    </Table.Body>
                </Table>
            ) : <p>You have no posts yet</p>}
        </div>
    );
};

export default DashPosts;