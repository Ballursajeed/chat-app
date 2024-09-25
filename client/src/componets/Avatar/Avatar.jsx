import React from 'react'
import "./Avatar.css"
import { useNavigate } from 'react-router-dom'

const Avatar = ({user}) => {

  const navigate = useNavigate()

  return (
    <div>
      <div className="blogHeader">
             <img className="avatar" 
                  src={user?.avatar ? user?.avatar : '/default-profile-image.webp'}
                  alt="User Avatar" />
               <div className="username"> {user?.username}</div>
            </div>
    </div>
  )
}

export default Avatar
