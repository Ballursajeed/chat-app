import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { useSelector } from 'react-redux';


const Profile = () => {

    const auth = useSelector((state) => state.auth);


  return (
    <>

      <div className="Profile-container">
        <div className="Profile-card">
          <img src={auth.user?.avatar ? auth.user.avatar : '/default-profile-image.webp' } alt="Avatar" />
          <h2 className="Profile-fullname">{auth.user?.fullName}</h2>
          <p className="Profile-username">{auth.user?.username}</p>
         
        </div>
          <div className="Profile-userblogs">

          </div>
      </div>
    </>
  )
}

export default Profile
