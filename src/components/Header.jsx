import { Navbar, TextInput, Button, Dropdown, Avatar, DropdownItem, DropdownDivider } from 'flowbite-react';
import { CiSearch } from "react-icons/ci";
import { Link, useLocation,useNavigate } from 'react-router-dom';
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { signOutAPI } from "../apis";
import React, { useEffect } from 'react';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signOut } from '../redux/user/userSlice';
import { toast } from 'react-toastify';
import { useState } from 'react';

const Header = () => {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const { theme } = useSelector(state => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setShowSearchInput] = useState(false);
  const handleSignOut = async () => {
    try {
      const res = await signOutAPI();
      toast.success('You are logged out');
      dispatch(signOut());
    } catch (error) {
      toast.error(error)
    }
  };
  const handleSubmit = (e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermURL = urlParams.get('searchTerm');
    if (searchTermURL) {
      setSearchTerm(searchTermURL);
    }
  },[location.search])
  return (
    <Navbar className='border-b-2 '>
      <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl
      font-semibold dark:text-white
      '>
        <span className='px-2 py-1 bg-gradient-to-r from-[#a18cd1] via-purple-400
         to-[#fbc2eb] rounded-lg text-white'>Dung Blog</span>
      </Link>
      <form className='hidden md:inline' onSubmit={handleSubmit}>
        <TextInput type='text' placeholder='Search...' rightIcon={CiSearch}
          className='hidden md:inline'
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </form>

      {searchInput ? <TextInput
        className='md:hidden'
        type='text' placeholder='Search...'
        rightIcon={CiSearch}
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      /> :
        <Button className='w-12 h-8 lg:hidden  border-black' color='gray' pill onClick={() => setShowSearchInput(true)}>
          <CiSearch />
        </Button>}
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
          <Button className='w-12 h-8  border-black' olor={`${theme === 'light' ? 'gray' : 'warning'}`} pill
            onClick={() => dispatch(toggleTheme())}>
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </Button>
        </Navbar.Link>
      </Navbar.Collapse>


      <div className='md:flex gap-2 items-center  hidden '>
        <Button className='w-12 h-8 hidden md:inline border-black' color={`${theme === 'light' ? 'gray' : 'warning'}`} pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaMoon /> : <FaSun />}
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
            <DropdownItem onClick={handleSignOut}>Sign out</DropdownItem>
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