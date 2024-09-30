import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { SERVER } from '../../constant';
import Messages from '../Messages/Messages';
import "./Chat.css"
import { Link, useNavigate } from 'react-router-dom';


const Chat = () => {

  const { id } = useParams()
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]); 
  const [selectedUser, setSelectedUser] = useState(' '); 
 
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate()

  const currentUserID = user?._id; 

  useEffect(() => {
    const socket = io('https://chat-app-server-uw6l.onrender.com');

    socket.emit('register', {userId:currentUserID});

    socket.on('myMessage',({ message }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        message
      ]);
  
      
      
    })

    socket.on('receive-message', ({ message }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        message
      ]);

      
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUserID]);

  

  useEffect(() => {
    const getMyMessages = async() => {
        const res = await axios.get(`${SERVER}/user/getAllMessages/${id}`,{
           withCredentials: true
         });
         setMessages([...messages,...res.data.messages]);
         setSelectedUser(res.data.user)
         
       }
       
        getMyMessages();
      
    }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (input && id) {

      const socket = io('https://chat-app-server-uw6l.onrender.com');
 
      socket.emit('send-message', {
        message: input,
        sender: currentUserID, 
        receiver: id
      });
  
      setInput(''); 
    }
  };
  
  return (
    <>
     <div className="selectedUserHeader" onClick={() => navigate(`/home/single-user/${selectedUser?._id}`)} >
    <img className="selectedAvatar" 
         src={selectedUser?.avatar ? selectedUser?.avatar : '/default-profile-image.webp'}
         alt="User Avatar" />
      <div className="selectedUsername"> {selectedUser?.username}</div>
    
   </div>
    <div className='chat-container'>
     
      <div className='chat-messages'>
        {messages.map((msg, index) => (
          <Messages key={index} message={msg.message} sender={msg?.sender === user?._id ? 'me' : 'other'} timeStamp={msg.timestamp} />
        ))}
      </div>

      <form className='chat-input-container' onSubmit={submitHandler}>
        <input 
          type="text"
          placeholder="Type a message..."
          className="chat-input"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button type="submit" className="chat-send-button">Send</button>
      </form>
    </div>
    </>
   
  );
}

export default Chat
