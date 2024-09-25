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
import Chat from "./componets/Chat/Chat";
import Navbar from "./componets/Navbar/Navbar";

function App() {

  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation()

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

  const shouldHideNavbar = location.pathname === "/login" || location.pathname === "/";

  return (
    <>
       {!shouldHideNavbar && <Navbar />}
   <Routes>
    <Route path="/" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/home" element={<Home />}>
          <Route path="chat/:id" element={<Chat />} />
    </Route>
   </Routes>
    </>
  );
}

export default App;
