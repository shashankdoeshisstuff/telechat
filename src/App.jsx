// imports of MUI
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.scss';
import { useChatData } from './ChatContext';

function App() {
  const { chatData, theme, setTheme, loading, error } = useChatData();

  // Storing Chats
  const chatsInbox = chatData?.data?.data || []; 

  return (
    <div>
      {/* Dashboard */}
      <main className='dash'>
        {/* Inbox Chats */}
        <section className={`chats-section ${theme}-chats-section`}>
          {chatsInbox.map(chat => (
            <div className='inbox-chats'>
              <div className='chat-img'>SB</div>
              <div className='inbox-chat-detail'>
                <div className='inbox-chat-name-status'>
                  <span >{chat.creator.name}</span>
                  <div className='inbox-status'>
                    <span>//</span>
                    <span>May 12</span>
                  </div>
                </div>
                <span>last message</span>
              </div>
            </div>
          ))}
        </section>
        {/* Chat */}
        <section className='chat-section'>
          
        </section>
      </main>
    </div>
  );
}

export default App;
