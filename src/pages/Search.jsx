import { Button, Pagination, Select, Spinner, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPostsAPI } from '../apis';
import Paginate from '../components/Paginate';
import PostCard from '../components/PostCard';

const Search = () => {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'uncategorized'
    });
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [counts, setCounts] = useState(1);
    const location = useLocation();
    const totalPages = Math.ceil(counts / 2) || 1;

    const handleChange = (e) => {
        setSidebarData({ ...sidebarData, [e.target.id]: e.target.value })
    }
    const onPageChange = (page) => {
        setCurrentPage(page);
    }
    const fetchPosts = async (searchQuery) => {
        setLoading(true);
        try {
            const res = await getPostsAPI(searchQuery);
            if (res.success) {
                setPosts(res.result);
                setLoading(false);
                setCounts(res.counts);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('category', sidebarData.category);
        urlParams.set('page', currentPage)
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
    }
    useEffect(() => {

        const urlParams = new URLSearchParams(location.search);
        const searchTermURL = urlParams.get('searchTerm');
        const sortURL = urlParams.get('sort');
        const categoryURL = urlParams.get('category');
        const page = urlParams.get('page');

        if (searchTermURL || sortURL || categoryURL) {
            setSidebarData({
                ...sidebarData,
                searchTerm: searchTermURL,
                sort: sortURL,
                category: categoryURL
            })
        }
        console.log(123)
        const searchQuery = urlParams.toString();
        fetchPosts(searchQuery);
    }, [location.search])
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('page', currentPage);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
    }, [currentPage])
    return (
        <div className='flex md:flex-row mb-[100px]'>
            <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
                <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Search:</label>
                        <TextInput
                            placeholder='Search...'
                            id='searchTerm'
                            type='text'
                            value={sidebarData.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort:</label>
                        <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
                            <option value='desc'>Latest</option>
                            <option value='asc'>Oldest</option>
                        </Select>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Category:</label>
                        <Select onChange={handleChange} value={sidebarData.category} id='category'>
                            <option value='uncategorized'>Uncategorized</option>
                            <option value='reactjs'>React.js</option>
                            <option value='nextjs'>Next.js</option>
                            <option value='javascript'>Javascript</option>
                        </Select>
                    </div>
                    <Button
                        type='submit'
                        outline
                        gradientDuoTone={'purpleToPink'}
                    >
                        Apply Filters
                    </Button>
                </form>
            </div>
            <div className='w-full'>
                <div className='flex justify-center'>
                    <h1 className='text-3xl font-semibold w-fit p-2 border-b-4 border-teal-500 text-center'>
                        Post results
                    </h1>
                </div>
                {
                    loading && <div className='flex justify-center items-center min-h-screen'>
                        <Spinner size='xl' />
                    </div>
                }
                <div className='mt-7 p-7 grid md:grid-cols-3 gap-4'>
                    {!loading && posts.length === 0 && <h1>No post founed</h1>}

                    {
                        !loading && posts && posts.length > 0 && posts.map(post => {
                            return <PostCard key={post._id} post={post} />
                        })
                    }
                </div>
                {counts > 2 && <div className="flex overflow-x-auto sm:justify-center">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                </div>}

            </div>

        </div>
    );
};

export default Search;