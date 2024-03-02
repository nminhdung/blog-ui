import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPostsAPI, getUsersAPI } from '../apis';
import { HiUserGroup, HiDocumentText } from "react-icons/hi";
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

const DashboardComp = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const { currentUser } = useSelector(state => state.user);
    const fetchPosts = async () => {
        try {
            const res = await getPostsAPI();
            if (res.success) {
                setPosts(res.result);
            }
        } catch (error) {
            console.log(error)
        }

    }
    const fetchUsers = async () => {
        try {
            const res = await getUsersAPI('limit=9');
            if (res.success) {
                setUsers(res.result);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUsers();
        fetchPosts();
    }, [])

    return (
        <div className='flex flex-col gap-5'>
            <div className=' flex flex-wrap items-center gap-4 '>
                <div className='flex justify-between items-center shadow-md dark:bg-slate-800  md:w-72 w-full p-3 rounded-md'>
                    <div className=''>
                        <h1 className='text-xl uppercase text-gray-500'>Total Posts</h1>
                        <span className='text-2xl'>{posts?.length}</span>
                    </div>
                    <HiUserGroup className='bg-teal-500 text-white rounded-full p-3 text-5xl shadow-lg' />
                </div>
                <div className='flex justify-between items-center shadow-md dark:bg-slate-800  md:w-72 w-full p-3 rounded-md'>
                    <div className=''>
                        <h1 className='text-xl uppercase text-gray-500'>Total Users</h1>
                        <span className='text-2xl'>{users?.length}</span>
                    </div>
                    <HiDocumentText className='bg-lime-500 text-white rounded-full p-3 text-5xl shadow-lg' />
                </div>

            </div>
            <div className='flex flex-wrap gap-5'>
                <div className='flex flex-col w-full md:w-auto shadow-md p-2 gap-2 rounded-md dark:bg-gray-800'>
                    <div className='flex justify-between items-center p-3 text-sm font-semibold'>
                        <h1>Recent Users</h1>
                        <Button gradientDuoTone='purpleToPink' outline>
                            <Link to={`/dashboard?tab=users`}>
                                See All
                            </Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>User image</Table.HeadCell>
                            <Table.HeadCell>Username</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            {users && users.map(user => {
                                return <Table.Row className='bg-white dark:bg-gray-800'>
                                    <Table.Cell>
                                        <img
                                            src={user?.avatar}
                                            alt='user'
                                            className='w-10 h-10 rounded-full object-cover'
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user?.username}
                                    </Table.Cell>
                                </Table.Row>
                            })}
                        </Table.Body>
                    </Table>
                </div>
                <div className='flex flex-col w-full md:w-auto shadow-md p-2 gap-2 rounded-md dark:bg-gray-800'>
                    <div className='flex justify-between items-center p-3 text-sm font-semibold'>
                        <h1>Recent Posts</h1>
                        <Button gradientDuoTone='purpleToPink' outline>
                            <Link to={`/dashboard?tab=posts`}>
                                See All
                            </Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Post Image</Table.HeadCell>
                            <Table.HeadCell>Post Title</Table.HeadCell>
                            <Table.HeadCell>Post Category</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            {posts && posts.map(post => {
                                return <Table.Row className='bg-white dark:bg-gray-800'>
                                    <Table.Cell>
                                        <img
                                            src={post?.image}
                                            alt='post image'
                                            className='w-10 h-10 rounded-full object-cover'
                                        />
                                    </Table.Cell>
                                    <Table.Cell className='w-96'>
                                        {post?.title}
                                    </Table.Cell>
                                    <Table.Cell className='w-50 '>
                                        {post?.category}
                                    </Table.Cell>
                                </Table.Row>
                            })}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default DashboardComp;