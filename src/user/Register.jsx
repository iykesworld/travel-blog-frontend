import React, { useState } from 'react'
import './User.css'
import { Link, useNavigate } from 'react-router';
import { useRegisterUserMutation } from '../redux/features/auth/authApi';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [registerUser, {isLoading}] = useRegisterUserMutation();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const data = {
          username,
          email,
          password
        }
        try {
          await registerUser(data).unwrap();
          alert('Registration successful. Please login now.');
          navigate('/login');
        } catch (error) {
          setMessage('Failed to register')
          alert('Registration failed')
        }
    }

  return (
    <div className='register'>
        <h2>Please Register</h2>
        <form className='register-form' onSubmit={handleRegister} >
        <input type="text" required value={username} placeholder='Username' onChange={(e)=> setUsername(e.target.value)} />
            <input type="email" required value={email} placeholder='Your email' onChange={(e)=> setEmail(e.target.value)} />
            <input type="password" required value={password} placeholder='Password' onChange={(e)=> setPassword(e.target.value)} />
            {
                message && <p className='error-message'>{message}</p>
            }
            <button type='submit'>Register</button>
        </form>
        <p className='login-p'>Already have an account? Please <Link className='login-link' to='/login'>Login</Link> here!</p>
    </div>
  )
}

export default Register