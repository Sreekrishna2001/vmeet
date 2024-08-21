import React, { useState, useEffect, useRef } from 'react';
import Call from './Call';

const Chat = ({peer, conn, userId}) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    conn.on('data', (data) => {
      // Handle incoming messages
      console.log('Received message:', data);
      setMessages((prevMessages) => [...prevMessages, { user: conn.peer, message: data }]);
    });

    return () => {
      peer.destroy();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      conn.send(message);
      console.log(conn);
      setMessages((prevMessages) => [...prevMessages, { user: userId, message }]);
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.userId}: {msg.message}</div>
        ))}
      </div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <Call peer={peer} targetId={conn.peer}/>
    </div>
  );
};

export default Chat;

