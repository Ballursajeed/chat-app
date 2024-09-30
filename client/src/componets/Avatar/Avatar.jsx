import React from 'react'
import "./Avatar.css"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Avatar = ({user,isOnline}) => {

  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth.user);


  return (
    <div>
      {
        user?._id === authUser?._id ? <></> : 
      <div className="blogHeader">
        <div className="avatar-container">
        <span className={isOnline ? 'status-dot online' : 'status-dot offline'}></span>
        <img className="avatar" 
             src={user?.avatar ? user?.avatar : '/default-profile-image.webp'}
             alt="User Avatar" />
          <div className="username"> {user?.username}</div>
        </div>
        
       </div>
      }
      
    </div>
  )
}

export default Avatar
