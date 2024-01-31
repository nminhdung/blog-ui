import React from 'react';
import { Sidebar } from 'flowbite-react';
import { HiArrowSmDown, HiUser } from 'react-icons/hi';

const DashSidebar = ({ tab }) => {
    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item active={tab === 'profile'} label={"User"} labelColor='dark' icon={HiUser}>
                        Profile
                    </Sidebar.Item>
                    <Sidebar.Item labelColor='dark' icon={HiArrowSmDown} className='cursor-pointer'>
                        Sign out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
};

export default DashSidebar;