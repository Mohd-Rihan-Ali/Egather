import React from 'react'
import '../styles/Chatbox.css'
const Chatbox = () => {
  return (
    <div className='main-div'>
          <div className="chat"></div>
          <form className='send-message'>
                 <input className="message-input" type="text" />
                 <div className="send-button">
                 <i class="fa-solid fa-paper-plane fa-xl"></i>
                 </div>
          </form>
    </div>
  )
}

export default Chatbox
