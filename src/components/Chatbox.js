import React from 'react'
import '../styles/Chatbox.css'
const Chatbox = () => {
  return (
    <div className='main-div'>
    <div className="chat"></div>
    <form className='send-message'>
           <input className="message-input" type="text" placeholder='Message'/>
           <span className='iconspan'>
            <span className="icon"></span>
           </span>
    </form>
</div>
  )
}

export default Chatbox
