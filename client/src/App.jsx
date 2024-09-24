import { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import Register from "./componets/Register/Register";

import { Route,  Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./componets/Login/Login";
import Home from "./componets/Home/Home";
import axios from "axios";
import { SERVER } from "./constant";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./auth/authSlice";

function App() {

  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
       const checkAuth = async() => {
        try {
          const response = await axios.get(`${SERVER}/user/me`, {
              withCredentials: true
          });

          if (response.data.status === 200) {
            dispatch(loginSuccess({
              user:response.data?.user,
              token: response.data?.user?.accessToken
             }))

          }
         
      } catch (error) {
          console.error('Failed to fetch user details:', error);
          navigate("/login")
      }
      setLoading(false);

       }
       checkAuth()
  },[])

  return (
    <>
      
   
   <Routes>
    <Route path="/" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/home" element={<Home/>}/>
   </Routes>
    </>
  );
}

export default App;
