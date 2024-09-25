import React from 'react'
import "./Avatar.css"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Avatar = ({user}) => {

  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth.user);


  return (
    <div>
      {
        user?._id === authUser?._id ? <></> : 
      <div className="blogHeader">
        <img className="avatar" 
             src={user?.avatar ? user?.avatar : '/default-profile-image.webp'}
             alt="User Avatar" />
          <div className="username"> {user?.username}</div>
       </div>
      }
      
    </div>
  )
}

export default Avatar
