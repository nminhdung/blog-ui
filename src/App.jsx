import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import FooterApp from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './pages/PrivateRoute';
import AdminPrivateRoute from './pages/AdminPrivateRoute';
import { ToastContainer } from 'react-toastify';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import PostDetails from './pages/PostDetails';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search';

function App() {
  return (

    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/search' element={<Search />} />
        <Route path='/about' element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<AdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path='/post/:pid' element={<PostDetails />} />

      </Routes>
      <FooterApp />
      <ToastContainer theme="colored" position='bottom-left' />
    </BrowserRouter>


  );
}

export default App;
