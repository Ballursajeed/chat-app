import axios from 'axios';
import React, { useState } from 'react'
import { SERVER } from '../../constant.js';
import { loginFailure, loginStart, loginSuccess } from '../../auth/authSlice.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const hangleSubmit = async() => {
        dispatch(loginStart())
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
      <div className="container">
        <input type="text" 
        placeholder='enter username' 
        value={username} 
        onChange={(e) => setUsername(e.target.value) }/>
       
        <input type="text" 
        placeholder='enter password'
        value={password} 
        onChange={(e) => setPassword(e.target.value) } />
        
        <button onClick={hangleSubmit}>submit</button>
      </div>
    </>
  )
}

export default Login
