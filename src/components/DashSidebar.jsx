import React from 'react';
import { Sidebar } from 'flowbite-react';
import { HiArrowSmDown, HiUser } from 'react-icons/hi';
import { signOutAPI } from '../apis';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/user/userSlice';

const DashSidebar = ({ tab }) => {
    const dispatch = useDispatch();
    const handleSignOut = async () => {
        try {
            const res = await signOutAPI();
            toast.success('You are logged out');
            dispatch(signOut());
        } catch (error) {
            toast.error(error)
        }

    }
    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item active={tab === 'profile'} label={"User"} labelColor='dark' icon={HiUser}>
                        Profile
                    </Sidebar.Item>
                    <Sidebar.Item labelColor='dark' icon={HiArrowSmDown} className='cursor-pointer' onClick={handleSignOut}>
                        Sign out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
};

export default DashSidebar;