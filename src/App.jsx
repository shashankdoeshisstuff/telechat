// imports of MUI
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.scss';
import { useChatData } from './ChatContext';
import ChatInbox from './component/ChatInbox';
import ActiveChat from './component/ActiveChat';

function App() {
  const { chatData, theme, setTheme, loading, error } = useChatData();

  return (
    <div>
      {/* Dashboard */}
      <main className={`dash ${theme}-theme`}>
        <ChatInbox />
        {/* Chat */}
        <ActiveChat/>
      </main>
    </div>
  );
}

export default App;
