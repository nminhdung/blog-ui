import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { app } from '../firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { signInGoogle } from '../apis';
import { signInSuccess } from '../redux/user/userSlice';
import {useNavigate} from 'react-router-dom';
import React from 'react'

const Oauth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {

        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const res = await signInGoogle({
                name: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL
            })
            dispatch(signInSuccess(res));
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
            <AiFillGoogleCircle className='size-6' />
            Continue with Google
        </Button>
    );
}

export default Oauth