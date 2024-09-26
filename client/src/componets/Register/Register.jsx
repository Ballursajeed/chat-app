import React, { useState } from 'react';
import axios from 'axios';
import {SERVER} from "../../constant.js"
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginStart,loginSuccess } from '../../auth/authSlice.js';


const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [fullName, setFullname] = useState('')
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const hangleSubmit = async() => {
       try {
         const res = await axios.post(`${SERVER}/user/register`,{
             username,
             email,
             fullName,
             password
         },
     {withCredentials: true});
 
       if (res.data.status === 201) {
        dispatch(loginStart())
            const loginRes = await axios.post(`${SERVER}/user/login`, {
                username,
                password
            }, { withCredentials: true });

            if (loginRes.data.status === 200) {
                console.log(loginRes.data);

                dispatch(loginSuccess({
                    user: loginRes.data.user,
                    token: loginRes.data.accessToken
                 }))
              navigate("/home")

            }

       }
 
     
       } catch (error) {
        console.log(error.response);
        
       }

    }

  return (
    <>
      <div className="registerContainer">
        <input type="text" 
        placeholder='enter username' 
        value={username} 
        onChange={(e) => setUsername(e.target.value) }/>
        <input type="text" 
        placeholder='enter email' 
        value={email} 
        onChange={(e) => setEmail(e.target.value) }/>
        <input type="text" 
        placeholder='enter fullname'
        value={fullName} 
        onChange={(e) => setFullname(e.target.value) } />
        <input type="text" 
        placeholder='enter password'
        value={password} 
        onChange={(e) => setPassword(e.target.value) } />
        <button onClick={hangleSubmit}>submit</button>
      </div>
      <div>
        already Have an Account?
        <Link to={'/login'}>
          Login
        </Link>
      </div>
    </>
  )
}

export default Register
