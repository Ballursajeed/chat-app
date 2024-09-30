import axios from 'axios';
import React, { useState } from 'react'
import { SERVER } from '../../constant.js';
import { loginFailure, loginStart, loginSuccess } from '../../auth/authSlice.js';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = async(e) => {
        dispatch(loginStart())
        e.preventDefault()
      try {
          const res = await axios.post(`${SERVER}/user/login`,{
              username,
              password
          },
      {withCredentials: true});
  
      if (res.data.status === 200) {
     dispatch(loginSuccess({
        user: res.data.user,
        token: res.data.accessToken
     }))
     console.log(res.data);
    navigate("/home")
      }

      } catch (error) {
        console.log(error?.response);
        dispatch(loginFailure)
      }
    

    }

  return (
    <>
      <div className="registerContainer">
     
     <div className="register">
      <h2>Login</h2>
        <form action="" method='post' onSubmit={submitHandler}>
          <div>
            <label htmlFor="username">Username: </label>
            <input type="text" 
                  placeholder='Enter Username...' 
                  id='username' 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
            />
          </div>

         <div>
            <label htmlFor="password">Password: </label>
            <input type="text" 
                  placeholder='Enter Password...'
                  id='password' 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
            />
         </div>

      <button type='submit' className='btn'>Submit</button>
      <div>
        <p>Not Registered?</p>
        <Link to="/">Register</Link> 
      </div>
      </form>
     </div>

     </div>
    </>
  )
}

export default Login
