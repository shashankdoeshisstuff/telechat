// imports of MUI
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.scss';
import { useChatData } from './ChatContext';

function App() {
  const { chatData, theme, setTheme, loading, error } = useChatData();

  console.log(chatData);

  return (
    <div>
      {/* Dashboard */}
      <main className='dash'>
        {/* Chats */}
        <section className={`chats-section ${theme}-chats-section`}>
          <ul>
            <li>chat</li>
            <li>chat</li>
            <li>chat</li>
            <li>chat</li>
            <li>chat</li>
          </ul>
        </section>
        {/* Chat */}
        <section className='chat-section'>
          
        </section>
      </main>
    </div>
  );
}

export default App;
