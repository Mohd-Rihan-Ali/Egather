import React, { useContext } from 'react'
import RoomContext from '../context/roomContext/roomContext';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';


const Participants = () => {
    const {users} = useContext(RoomContext);
    const convertToCSV = () => {
    
      const csv = Papa.unparse(users);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    
      // Use the FileSaver library to save the CSV file
      saveAs(blob, 'students.csv');
    };
    
  return (
    <div>
      <button className='btn btn-secondary mx-2 backg-black' onClick={convertToCSV}>Take Attendance</button>
      { 
         users.map((user)=>{
             return <div style={{'color':'white'}}>{user.name}</div>
         })
        }
    </div>
  )
}

export default Participants
