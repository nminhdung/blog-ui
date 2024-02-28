import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moonImg from "../assets/images/moon.png"
import book from "../assets/images/powerofnow.jpg"
import { getPostsAPI } from '../apis'
import PostCard from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    try {
      const res = await getPostsAPI('limit=9');
      if (res.success) {
        setPosts(res.result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  return (
    <div className='mb-[200px]'>
      <div className='xl:w-[1200px] xl:p-0 mx-auto p-4 grid md:grid-cols-2 gap-10'>
        <div className='flex flex-col gap-6 justify-center'>
          <h1 className='text-3xl font-bold lg:text-4xl tracking-[3px]'>Welcome to my Blog</h1>
          <p className='text-sm text-gray-500 tracking-[1px] text-wrap'>
            Here you'll find a variety of articles and tutorials on topics such as web development,
            software engineering, and programming languages
          </p>
          <Link to={'/search'}
            className='text-teal-400 font-semibold hover:underline text-xs sm:text-sm tracking-[1px]'>
            View all posts
          </Link>
        </div>
        <img
          src={moonImg} alt='moon img'
          className='w-[500px] h-full object-cover drop-shadow-3xl-yellow animate-move-top-down'
        />
      </div>
      <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 my-[100px] '>
        <div className='xl:w-[1200px] mx-auto p-6 flex md:flex-row gap-4 items-center justify-between'>
          <div className='flex flex-col gap-2 text-white'>
            <h1 className='text-3xl lg:text-4xl capitalize'>Power of now</h1>
            <span className='text-sm'>Author: Eckhart Tolle</span>
            <p className='text-wrap max-w-[500px] text-xl italic'>
              " The moment you grasp it, there is a shift in consciousness from mind Being,
              from time to presence. Suddenly, everything feels alive, radiates energy, emanates Being "
            </p>
          </div>
          <img src={book} alt='book' className=' w-[200px] h-[200px] object-cover' />
        </div>
      </div>
      <div className='xl:w-[1200px] xl:p-0 mx-auto p-4'>
        <h1 className='text-center text-3xl lg:text-4xl mb-10'>Posts</h1>

        {posts.length === 0 ? <h1>No posts yet</h1> :
          <div className='grid md:grid-cols-3 gap-4'>
            {
              posts.map((post) => {
                return <PostCard key={post._id} post={post} />
              })
            }
          </div>
        }
        <div className='flex items-center justify-center mt-10'>
          <Link to={'/search'}
            className='text-teal-400 font-semibold  text-xs sm:text-sm
             tracking-[1px] text-center p-3 border border-teal-500 '>
            View all posts
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Home;