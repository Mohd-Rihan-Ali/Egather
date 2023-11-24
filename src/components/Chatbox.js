import React, { useContext, useState } from 'react'
import '../styles/Chatbox.css'
import RoomContext from '../context/roomContext/roomContext';
import Chat from './Chat';
const Chatbox = () => {
  const { ws , messages, setMessages,userName} = useContext(RoomContext);
  const [message, setMessage] = useState("");
  const handleSendMessage = ()=>{
      console.log(message)
      setMessages((ps)=>{
            return [...ps, {name:userName, message}];
      })
       ws.emit('message', {userName, message});
       setMessage('')
  }
  return (
    <div className='main-div'>
    <div className="chats">
      { 
        messages.map((m) => {
          return <Chat chat={m.message} name={m.name}/>
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
