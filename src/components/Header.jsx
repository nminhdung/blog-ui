import { Navbar, TextInput, Button, Dropdown, Avatar, DropdownItem, DropdownDivider } from 'flowbite-react';
import { CiSearch } from "react-icons/ci";
import { Link, useLocation } from 'react-router-dom';
import { FaMoon } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';

import React from 'react';
import { toggleTheme } from '../redux/theme/themeSlice';

const Header = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  return (
    <Navbar className='border-b-2 '>
      <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl
      font-semibold dark:text-white
      '>
        <span className='px-2 py-1 bg-gradient-to-r from-[#a18cd1] via-purple-400
         to-[#fbc2eb] rounded-lg text-white'>Dung Blog</span>
      </Link>
      <form className='hidden md:inline'>
        <TextInput type='text' placeholder='Search...' rightIcon={CiSearch}
          className='hidden md:inline'
        />
      </form>
      <Button className='w-12 h-8 lg:hidden  border-black' color='gray' pill >
        <CiSearch />
      </Button>
      <Navbar.Toggle />


      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>

        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link className='flex gap-2 items-center md:hidden'>
          Mode:
          <Button className='w-12 h-8  border-black' color='gray' pill
            onClick={() => { console.log('123'); dispatch(toggleTheme()) }}>
            <FaMoon />
          </Button>
        </Navbar.Link>
      </Navbar.Collapse>


      <div className='md:flex gap-2 items-center  hidden '>
        <Button className='w-12 h-8 hidden md:inline border-black' color='gray' pill
          onClick={() => { console.log('123'); dispatch(toggleTheme()) }}
        >
          <FaMoon />
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt='user'
                img={currentUser?.avatar}
                rounded

              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{currentUser?.username}</span>
              <span className="block truncate text-sm font-medium">{currentUser?.email}</span>
            </Dropdown.Header>
            <Link to={`/dashboard?tab=profile`}>
              <DropdownItem>Profile</DropdownItem>
            </Link>
            <DropdownDivider />
            <DropdownItem>Sign out</DropdownItem>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button className='hidden md:inline'
              gradientDuoTone="purpleToPink"
            >Sign In</Button>
          </Link>
        )}

      </div>
    </Navbar>
  );
};

export default Header;