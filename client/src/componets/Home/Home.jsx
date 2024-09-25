import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { SERVER } from '../../constant';
import Avatar from '../Avatar/Avatar';
import { useNavigate } from 'react-router-dom';
import "./Home.css";
import { Outlet } from 'react-router-dom';

const Home = () => {

  const authUser = useSelector((state) => state.auth.user);
  const [users,setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  console.log("auth user",authUser);
  
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

   console.log("users: ",authUser);

   const handleNavigation = (id) => {
     navigate(`/home/chat/${id}`)
     window.location.reload();

   }

   const filteredUsers = users.filter(user =>
    user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) // Assuming users have a 'name' property
  );

  return (
    <div className='container'>
      <div className="users">
      <input 
          type="text" 
          placeholder='Search Users' 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="search-bar"
        />
         <div className="user-list">
          {filteredUsers.map((user) => (
            <div key={user?._id} onClick={() => handleNavigation(user?._id)}>
              <Avatar user={user} /> 
              <span>{user.name}</span> {/* Display user name */}
            </div>
          ))}
        </div>
      </div>
      {/* <Chat targetUser={} /> */}
      <div className="chat">
       <Outlet />
      </div>
    </div>
  )
}

export default Home
