import React, { useContext, useState } from 'react'
import '../styles/Chatbox.css'
import RoomContext from '../context/roomContext/roomContext';
import Chat from './Chat';
const Chatbox = () => {
  const { ws , messages, setMessages} = useContext(RoomContext);
  const [message, setMessage] = useState("");
  const handleSendMessage = ()=>{
      console.log(message)
      setMessages((ps)=>{
            return [...ps, message];
      })
       ws.emit('message', message);
       setMessage('')
  }
  return (
    <div className='main-div'>
    <div className="chats">
      { 
        messages.map((m) => {
          return <Chat chat={m}/>
         })
       }
    </div>
    <form className='send-message'>
           <input className="message-input" type="text" placeholder='Message' value={message} onChange={(e)=>setMessage(e.target.value)}/>
           <span className='iconspan' onClick={handleSendMessage}>
            <span className="icon"></span>
           </span>
           <button type="submit" onClick={(e)=>{e.preventDefault();handleSendMessage()}}hidden></button>
    </form>
</div>
  )
}

export default Chatbox
