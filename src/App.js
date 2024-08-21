import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import Peer from 'peerjs';
import Chat from './components/Chat';

function App() {
  const [peer, setPeer] = useState(null);
  const [peerConn, setPeerConn] = useState(null);
  const [userId, setUserId] = useState(null);
  const [targetId, setTargetId] = useState('');
  
  useEffect(() => {
    const peer = new Peer();
    console.log(peer);
    
    setPeer(peer);

    peer.on('open', (id) => {
      setUserId(id);
      console.log('My peer ID is', id);
    });

    peer.on('connection', function(conn) {
      console.log("connection established....");
      console.log(conn);
      setPeerConn(conn);
      setTargetId(conn.peer);
    });

    return () => {
      peer.destroy();
    };
  }, []);

  const connectToPeer = () => {
    const conn = peer.connect(targetId);
    conn.on('open', () => {
      console.log('Connected to', targetId); 
      setPeerConn(conn);
    });
  };

  let PeerInput = () => {
    return (<div className='peerinput'>
          <input type="text" placeholder="Target Peer ID" value={targetId} onChange={(e) => setTargetId(e.target.value)} />
          <button onClick={connectToPeer}>Connect</button>
          </div>)
  }

  return (
    <div className="App">
      {userId?<h6>Your ID: {userId}</h6>:<h6>Fetching... your ID</h6>}
      {peerConn?<h6>You are connected with Peer: {targetId}</h6>:<h6>You are not connected with any Peer 😒</h6> }
      {peerConn ?<Chat peer={peer}  conn={peerConn} userId={userId}/>:<PeerInput />}
    </div>
  );
}

export default App;
