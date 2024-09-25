import React from 'react';
import "./Messages.css";

const Messages = ({ message, sender, timeStamp }) => {

const hour = new Date(timeStamp).getHours()
const minute = new Date(timeStamp).getMinutes()
// Convert to a more readable format
const readableHour = hour.toLocaleString()
const readableMinute = minute.toLocaleString()

  return (
    <div className={`box ${sender === 'me' ? 'me' : 'other'}`}>
      <div className={`message ${sender === 'me' ? 'sent' : 'received'}`}>
        {message}
        <span className="timestamp">{readableHour}:{readableMinute}</span>
      </div>
    </div>
  );
};

export default Messages;
