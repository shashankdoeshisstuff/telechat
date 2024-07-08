import React, { useEffect, useState } from 'react'
import { useChatData } from '../ChatContext';
import './ChatInbox.scss';

const ChatInbox = () => {
  const { currentChat, setCurrentChat, chatData, theme, setTheme, loading, error } = useChatData();
  const [lastMessages, setLastMessages] = useState({});  
  // Storing Chats
  const chatsInbox = chatData?.data?.data || [];

  // Function to get last message
  useEffect(() => {
    const fetchLastMessages = async () => {
      const lastMsgs = [];
      for (const chat of chatsInbox) {
        try {
          const response = await fetch(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chat.id}`);
          if (response.ok) {
            const data = await response.json();
            lastMsgs[chat.id] = data.data[0] || 'No messages yet';
          } else {
            lastMsgs[chat.id] = 'Failed to fetch';
          }
        } catch (error) {
          console.error('Error fetching last message:', error);
          lastMsgs[chat.id] = 'Error fetching message';
        }
      }
      setLastMessages(lastMsgs);
    };

    fetchLastMessages();
  }, [chatsInbox]);
  

  const handleActiveChatBackground = (chatId) => {
    if (currentChat === chatId) {
        return 'inbox-active-chat'
    } else {
        return 'inbox-chats-hover'
    }
  }

  // Function to convert the last msg time
  const convertToIST = (utcTimeString) => {
    const utcDate = new Date(utcTimeString);
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const istDate = new Date(utcDate.getTime() + istOffset);
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    // Determine the format based on message age
    if (utcDate > oneWeekAgo) {
      // Show day of the week only
      const options = { weekday: 'long' };
      return istDate.toLocaleDateString('en-IN', options);
    } else if (utcDate > oneMonthAgo) {
      // Show day and date
      const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
      return istDate.toLocaleDateString('en-IN', options);
    } else {
      // Show in dd/mm/yy format
      const day = istDate.getDate().toString().padStart(2, '0');
      const month = (istDate.getMonth() + 1).toString().padStart(2, '0');
      const year = istDate.getFullYear().toString().slice(-2);
      return `${day}/${month}/${year}`;
    }
  };

  return (
    <>
    {/* Inbox Chats */}
    <section className='chats-inbox-section'>
        {chatsInbox.map((chat, index) => (
        <div key={index} className={`inbox-chats ${handleActiveChatBackground(chat.id)}`}
            onClick={() => setCurrentChat(chat.id)}
        >
            <div className='chat-img'>
                {chat.creator.name ? (
                    <>{chat.creator.name.split(' ').map((n) => n[0]).join('').toUpperCase()}</>
                ) : null }
            </div>
            <div className='inbox-chat-detail'>
                <div className='inbox-chat-name-status'>
                    <span className='inbox-chat-card-name'>{chat.creator.name}</span>
                    <div className='inbox-status'>
                        <span>//</span>
                        <span className='card-msg-time'>{convertToIST(lastMessages[chat.id]?.created_at)}</span>
                    </div>
                </div>
                <span className='inbox-chat-last-msg'>
                    {lastMessages[chat.id]?.sender.name !== chat.creator.name ? (
                        <span className='card-msg-sender'>You: </span>
                    ) : null}
                    {lastMessages[chat.id]?.message}
                </span>
            </div>
        </div>
        ))}
    </section>
    </>
  )
}

export default ChatInbox;