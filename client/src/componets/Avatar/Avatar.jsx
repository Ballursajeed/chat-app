import React, { useEffect, useState } from 'react'
import "./Avatar.css"
import { useSelector } from 'react-redux';

const Avatar = ({user,isOnline}) => {

  const authUser = useSelector((state) => state.auth.user);


  return (
    <div>
      {
        user?._id === authUser?._id ? <></> : 
      <div className="blogHeader">
        <div className="avatar-container">
        <div className="imgAvatar">
        <img className="avatar" 
             src={user?.avatar ? user?.avatar : '/default-profile-image.webp'}
             alt="User Avatar" />
        <span className={isOnline ? 'status-dot online' : 'status-dot offline'}></span>

        </div>
       
          <div className="username"> {user?.username}</div>
        </div>
        
       </div>
      }
      
    </div>
  )
}

export default Avatar
