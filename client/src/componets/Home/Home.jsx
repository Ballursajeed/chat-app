import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import Chat from '../Chat/Chat';
import axios from 'axios';
import { SERVER } from '../../constant';
import Avatar from '../Avatar/Avatar';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const user = useSelector((state) => state.auth.user);
  const [users,setUsers] = useState([])

  console.log("auth user",user);
  
  const navigate = useNavigate()

  useEffect(() => {
        const fetchAllUsers = async() => {
             const res = await axios.get(`${SERVER}/user/geAllUsers`,{
              withCredentials:true
             });
             setUsers(res.data.users)
             
        }
        fetchAllUsers()
   },[])

   console.log("users: ",users);
   

  return (
    <div>
      <div className="users">
         {
          users.map((user) => {
           return( 
            <div onClick={() => navigate(`/chat/${user?._id}`)}>
             <Avatar user={user}/> 
            </div>
          )
          })
         }
      </div>
      {/* <Chat targetUser={} /> */}
    </div>
  )
}

export default Home
