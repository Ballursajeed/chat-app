import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SERVER } from '../../constant';
import './SingleUser.css'

const SingleUser = () => {

    const {id} = useParams();
    const [user,setUser] = useState({});

    useEffect(() => {
       const getSingleUser = async() => {
        const res = await axios.get(`${SERVER}/user/getSingleUser/${id}`,{
            withCredentials: true
        })
        
        if (res.data?.status === 200) {
            
            setUser(res.data?.user)
         }
       }
       
    getSingleUser()

    },[]);

    

    

  return (
    <>
    <div className="single-container">
      <div className="single-card">
        <img src={user?.avatar ? user.avatar : '/default-profile-image.webp' } alt="Avatar" />
        <h2 className="single-fullname">{user?.fullName}</h2>
        <p className="single-username">{user?.username}</p>
      </div>
       
    </div>
  </>
  )
}

export default SingleUser
