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
    const [file, setFile] = useState()
    const [loading, setLoading] = useState(false);  // Add loading state


    const dispatch = useDispatch()
    const navigate = useNavigate()


    const hangleSubmit = async(e) => {
      e.preventDefault()

       try {
        const formData = new FormData();
         formData.append("email",email)
         formData.append("username",username)
         formData.append("fullName",fullName)
         formData.append("password",password)
         
         if (file) {
            formData.append("avatar",file)
         }
         const res = await axios.post(`${SERVER}/user/register`,formData,
         {
          headers: {
              'Content-Type': 'multipart/form-data',
          }
       });
 
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
     <div className='register'>
      <h2>Register</h2>
      <form action="" method='post' onSubmit={hangleSubmit}>
          <div>
           <label htmlFor="fullName">Full Name: </label>
           <input type="text" 
                placeholder='Enter Full Name...' 
                id='fullName' 
                value={fullName}
                onChange={(e) => setFullname(e.target.value)}
                required
           />
          </div>
          <div>
          <label htmlFor="email">Email: </label>
                    <input type="text" 
                          placeholder='Enter Email...' 
                          id='email' 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                    />
          </div>

          <div>
            <label htmlFor="username">Username: </label>
            <input type="text" 
                  placeholder='Enter Username...' 
                  id='username' 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
            />
          </div>

          <div>
            <label htmlFor="password">Password: </label>
            <input type="text" 
                  placeholder='Enter Password...'
                  id='password' 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
            />
          </div>

          <div className='imageUpload'>
    <label htmlFor='avatar'>Upload Profile Image:</label>
    <label className="customFileUpload">
        <span className="uploadIcon">📁 Choose File</span> 
        <p></p>
        <input type="file" id="avatar" onChange={(e) => {
            setFile(e.target.files[0]);
            document.getElementById('fileName').textContent = e.target.files[0]?.name || "No file chosen";
        }} />
    </label>
    <span id="fileName" className="fileName">No file chosen</span>
</div>
          <button type='submit' className='btn'>Submit</button>
          <div>
            <p>Already have an Account?</p>
            <Link to="/login">Login</Link> 
          </div>
        </form>
     </div>
     </div>
      
       
    
    </>
  )
}

export default Register
