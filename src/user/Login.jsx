import React, { useState } from 'react'
import './User.css'
import { Link, useNavigate } from 'react-router';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { useDispatch } from "react-redux";
import { saveUserToLocalStorage, setUser } from '../redux/features/auth/authSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loginUser, {isLoading: loginLoading}] = useLoginUserMutation();
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage('Both fields are required');
            return;
        }

        const data = { email, password };

        try {
            const response = await loginUser(data).unwrap();
            const { token, user } = response;
            alert('Login successful');
            navigate('/');
            // Store token/user if necessary
            dispatch(setUser( user ));
            saveUserToLocalStorage(user); 
            console.log("Saving user to localStorage:", user);
        } catch (error) {
            setMessage(error.data?.message || 'Please provide a valid email and password');
        }
    };

    const onchangeEmail = (e)=>{
        setEmail(e.target.value);
        setMessage('');
    };
    const onchangePassword = (e)=>{
        setPassword(e.target.value);
        setMessage('');
    };
  return (
    <div className='login'>
        <h2>Please Login</h2>
        <form onSubmit={handleLogin} className='login-form' >
            <input type="email" 
            required value={email} 
            placeholder='Your email' 
            onChange={onchangeEmail} />
            <input type="password" 
            required value={password} 
            placeholder='Password' 
            onChange={onchangePassword} />
            {
                message && <p className='error-message'>{message}</p>
            }
            <button disabled={loginLoading} type='submit'>{loginLoading ? 'Logging in...' : 'Login'}</button>
        </form>
        <p className='login-p'>Don't have an account <Link className='login-link' to='/register'>Register</Link> here!</p>
    </div>
  )
}

export default Login