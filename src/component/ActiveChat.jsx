import React, { useEffect, useState } from 'react'
import { useChatData } from '../ChatContext'
import './ActiveChat.scss'

const ActiveChat = () => {
    const { messages, currentChat } = useChatData();


  return (
    <div className='opened-chat'>
      <div className='chat-info'>sdf</div>
      <div className='messages-section'>
        <div className='messages-box'>
          <div className='messages-container'>
            {messages ? (
                <>
                { [...messages].map((message, index) => (
                      <div key={index}
                        className={`message-bubble ${message.sender_id === 1 ? 'your-message' : 'senders-message'}`}
                      >
                        {message.message}
                      </div>
                  ))
                }
                </>
              ) : ('Loading...')}
          </div>
          <div className='message-input'>msg input</div>
        </div>
      </div>   
    </div>
  )
}

export default ActiveChat