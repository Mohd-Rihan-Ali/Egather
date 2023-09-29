import React, { useState, useEffect, useCallback} from 'react'
import { useSocket } from '../context/SocketProvider';
import { useNavigate } from 'react-router-dom';

function Join() {
  let [email, setEmail] = useState('');
  let [room, setRoom] = useState('');
  const navigate = useNavigate();
  const socket = useSocket();

  const handleSubmit = useCallback((e)=>{
    e.preventDefault();
    socket.emit('room:join', {email, room})
}, [email, room , socket]);

  const handleJoinRoom = useCallback((data)=>{
    const {email, room} = data;
    navigate(`/meet/${room}`)
}, [navigate]);

  useEffect(()=>{
       socket.on('room:join',handleJoinRoom);
       return ()=>{
        socket.off('room:join', handleJoinRoom);
       }
  }, [socket, handleJoinRoom]);
  
  return (
    <div className='container my-3 bg-dark text-light'>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" className="form-control" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="room" className="form-label">Room</label>
    <input type="password" className="form-control" id="room" value={room} onChange={(e)=>{setRoom(e.target.value)}}/>
  </div>
  <button type="submit" className="btn btn-secondary mb-2 mx-2 backg-black">Join</button>
</form>
    </div>
  )
}

export default Join
