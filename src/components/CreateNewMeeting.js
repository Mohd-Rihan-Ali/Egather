import React, { useCallback, useContext, useState} from 'react'
import RoomContext from '../context/roomContext/roomContext';
const CreateNewMeeting = () => {
    let [name, setName] = useState('');
    const { ws } = useContext(RoomContext);
  const handleSubmit = useCallback((e)=>{
    e.preventDefault();
    console.log("iamrunning");
    ws.emit("create-room", {name});
  }, [])
  return (
    <div className='container my-3 bg-dark text-light'>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
  </div>
  <button type="submit" className="btn btn-secondary mb-2 mx-2 backg-black">Create</button>
</form>
    </div>
  )
}

export default CreateNewMeeting
