import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const Chat = () => {

  const { id } = useParams()
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]); 

  const user = useSelector((state) => state.auth.user)

  const currentUserID = user?._id; 

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.emit('register', currentUserID);

    socket.on('receive-message', ({ message, sender }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        `Message from ${sender}: ${message}`
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUserID]);

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

  console.log("target ID:", id);
  

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
        {/* Display all received messages */}
         {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
        </div>
    </div>
  )
}

export default Chat
