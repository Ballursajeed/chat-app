import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { SERVER } from '../../constant';
import Messages from '../Messages/Messages';

const Chat = () => {

  const { id } = useParams()
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]); 
  const [myMessage, setMyMessage] = useState([]); 

  const user = useSelector((state) => state.auth.user)

  const currentUserID = user?._id; 

  useEffect(() => {
    const socket = io('http://localhost:3000');

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

    // 
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
         console.log("res.data:",res.data.messages[0].sender,user?._id);
         
       }
         getMyMessages()
  },[])

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (input && id) {



      const socket = io('http://localhost:3000');
      
      

      socket.emit('send-message', {
        message: input,
        sender: currentUserID, 
        receiver: id
      });
  
      setInput(''); 
    }
  };
  
  return (
    <div>
      <input 
        type="text"
        placeholder="Enter your message"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      
      <button onClick={submitHandler}>Send</button>
  
      <div className="output">
        {messages.map((msg, index) => (
          <div key={index}>
            <Messages message={msg.message} sender={msg?.sender === user?._id ? 'me' : 'other'} timeStamp={msg.timestamp} />
          </div>
        ))}
       
      </div>
    </div>
  );
}

export default Chat
