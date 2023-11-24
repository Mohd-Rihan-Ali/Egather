import React, { useContext } from 'react'
import RoomContext from '../context/roomContext/roomContext';

const Participants = () => {
    const {users} = useContext(RoomContext);
  return (
    <div>
      { 
         users.map((user)=>{
             return <div style={{'color':'white'}}>{user.name}</div>
         })
        }
    </div>
  )
}

export default Participants
