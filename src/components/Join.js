import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import RoomContext from '../context/roomContext/roomContext';

function Join() {
  let [name, setName] = useState('');
  let [roomId, setRoomId] = useState('');
  const navigate = useNavigate();
  const { ws } = useContext(RoomContext);


  const handleSubmit = (e)=>{
    e.preventDefault();
     ws.emit("someone-trying-to-join-room", { roomId });
    ws.on("valid-roomId",()=>{
        navigate(`/meet/${roomId}`);
    });
    ws.on("invalid-roomId",()=>{
        console.log("invalid-roomId");
    })
  }


  return (
    <div className='container my-3 bg-dark text-light'>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="roomId" className="form-label">roomId</label>
    <input type="text" className="form-control" id="roomId" value={roomId} onChange={(e)=>{setRoomId(e.target.value)}}/>
  </div>
  <button type="submit" className="btn btn-secondary mb-2 mx-2 backg-black">Join</button>
</form>
    </div>
  )
}

export default Join
