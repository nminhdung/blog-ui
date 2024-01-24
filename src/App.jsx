import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import FooterApp from './components/Footer';


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/sign-in' element={<Signin />} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
        <FooterApp/>
      </BrowserRouter>
      <ToastContainer theme="colored" position='bottom-left'/>
    </>
  );
}

export default App;
