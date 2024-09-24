import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const Home = () => {

  const [input, setInput] = useState('');
  const [targetId, setTargetId] = useState(''); // Input field for the recipient (target user)
  const [messages, setMessages] = useState([]); // Storing received messages

  const user = useSelector((state) => state.auth.user)

  const currentUserID = user?.username;  // Replace with actual logged-in user ID

  useEffect(() => {
    // Connect to the server and register the current user
    const socket = io('http://localhost:3000');

    socket.emit('register', currentUserID);

    // Listen for incoming messages directed to this user
    socket.on('receive-message', ({ message, sender }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        `Message from ${sender}: ${message}`
      ]);
    });

    // Cleanup socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, [currentUserID]);

  const submitHandler = (e) => {
    e.preventDefault();
    
    // Ensure the user enters both a message and target ID
    if (input && targetId) {
      const socket = io('http://localhost:3000');
      
      // Emit the message to the server
      socket.emit('send-message', {
        message: input,
        userId: currentUserID,  // Sender's ID
        targetId: targetId      // Receiver's ID
      });

      setInput(''); // Clear the input field after sending
    }
  };

  console.log("auth user",user);
  

  return (
    <div>
     <input 
        type="text"
        placeholder="Enter your message"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      
      <input 
        type="text"
        placeholder="Enter target user ID"
        onChange={(e) => setTargetId(e.target.value)}
        value={targetId}
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

export default Home
