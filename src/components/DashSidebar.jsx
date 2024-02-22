import React from 'react';
import { Sidebar } from 'flowbite-react';
import { HiArrowSmDown, HiDocument, HiDocumentText, HiUser } from 'react-icons/hi';
import { signOutAPI } from '../apis';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../redux/user/userSlice';
import { Link } from 'react-router-dom';

const DashSidebar = ({ tab }) => {
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const handleSignOut = async () => {
        try {
            const res = await signOutAPI();
            toast.success('You are logged out');
            dispatch(signOut());
        } catch (error) {
            toast.error(error)
        }

    };
    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup className='flex flex-col gap-1'>

                    <Sidebar.Item active={tab === 'profile'} label={"User"} labelColor='dark' icon={HiUser} as='div'>
                        <Link to={`/dashboard?tab=profile`}> Profile  </Link>
                    </Sidebar.Item>

                    {currentUser.isAdmin && 
                        <Sidebar.Item active={tab === 'posts'} label={"Posts"} labelColor='dark' icon={HiDocumentText} as='div'>
                           <Link to={`/dashboard?tab=posts`}>  Posts</Link>
                        </Sidebar.Item>
                    }
                    {currentUser.isAdmin && 
                        <Sidebar.Item active={tab === 'users'} label={"Users"} labelColor='dark' icon={HiDocumentText} as='div'>
                           <Link to={`/dashboard?tab=users`}>  Users</Link>
                        </Sidebar.Item>
                    }


                    <Sidebar.Item labelColor='dark' icon={HiArrowSmDown} className='cursor-pointer' onClick={handleSignOut}>
                        Sign out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
};

export default DashSidebar;