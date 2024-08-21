import React, { useEffect, useRef, useState } from 'react';
 

export default function Call ({peer,targetId}) {
    // const [peerId, setPeerId] = useState('');
    // const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
    const remoteVideoRef = useRef(null);
    const currentUserVideoRef = useRef(null);
    // const peerInstance = useRef(null);

    useEffect(() => {
      console.log(peer,targetId);
        peer.on('call', (call) => {
          var getUserMedia = navigator.getUserMedia 
          || navigator.webkitGetUserMedia 
          || navigator.mozGetUserMedia;
    
          getUserMedia({ video: true, audio: true }, (mediaStream) => {
            currentUserVideoRef.current.srcObject = mediaStream;
            // currentUserVideoRef.current.play();
            call.answer(mediaStream)
            call.on('stream', function(remoteStream) {
              remoteVideoRef.current.srcObject = remoteStream
            //   remoteVideoRef.current.play();
            });
          });
        })
      }, [])

      const call = () => {
        var getUserMedia = navigator.getUserMedia 
        || navigator.webkitGetUserMedia 
        || navigator.mozGetUserMedia;
    
        getUserMedia({ video: true, audio: true }, (mediaStream) => {
    
          currentUserVideoRef.current.srcObject = mediaStream;
        //   currentUserVideoRef.current.play();
    
          const call = peer.call(targetId, mediaStream)
    
          call.on('stream', (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream
            // remoteVideoRef.current.play();
          });
        });
      }

      return (
        <div className="App">
          <button onClick={() => call()}>Call</button>
          <div>
            <video ref={currentUserVideoRef} autoPlay playsInline />
          </div>
          <div>
            <video ref={remoteVideoRef} autoPlay playsInline/>
          </div>
        </div>
      );
}