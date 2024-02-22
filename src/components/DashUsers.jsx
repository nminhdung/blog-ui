import { Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { deletePostAPI, deleteUserAPI, getUsersAPI } from '../apis';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import { toast } from 'react-toastify';

const DashUsers = () => {
    const [users, setUsers] = useState([]);
    const { currentUser } = useSelector(state => state.user)
    const [reFetch, setRefetch] = useState(false)
    const fetchUsers = async () => {
        const res = await getUsersAPI();
        if (res.success) {
            setUsers(res.result)
        }
    }
    const render = () => {
        console.log('re-fetch')
        setRefetch(!reFetch);
    }
    const handleDelete = async (userId) => {
        Swal.fire({
            title: "Are you sure",
            text: "Do you want to remove this post",
            icon: "warning",
            showCancelButton: true,
        }).then(async (rs) => {
            if (rs.isConfirmed) {
                const res = await deleteUserAPI(userId);
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
        fetchUsers();
    }, [reFetch])
    return (
        <div className='table-auto p-4 overflow-x-scroll 
        scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {currentUser.isAdmin && users.length > 0 ? (
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Date Updated</Table.HeadCell>
                        <Table.HeadCell>Avatar</Table.HeadCell>
                        <Table.HeadCell>Username</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Date Created</Table.HeadCell>
                        <Table.HeadCell>Delete</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className='divide-y'>
                        {users.map(user => {
                            return <Table.Row key={user._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                <Table.Cell
                                    className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                                    {new Date(user.updatedAt).toLocaleString()}
                                </Table.Cell>
                                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                                    <Link to={`/post/slug/${user.slug}`}>
                                        <img src={user.avatar} alt={user.username} className='w-20 h-10 object-cover ' />
                                    </Link>
                                </Table.Cell>
                                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                                    <Link to={`/users/slug/${user.slug}`}>
                                        {user.username}
                                    </Link>
                                </Table.Cell>

                                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                                    {user.email}
                                </Table.Cell>
                                <Table.Cell
                                    className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                                    {new Date(user.createdAt).toLocaleString()}
                                </Table.Cell>
                                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                                    <span className="font-medium text-red-500 hover:underline dark:text-red-600 cursor-pointer"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </span>
                                </Table.Cell>
                            </Table.Row>
                        })}
                    </Table.Body>
                </Table>
            ) : <p>You have no users yet</p>}
        </div>
    );
};

export default DashUsers;