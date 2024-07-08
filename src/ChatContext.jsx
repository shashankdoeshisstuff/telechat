import { createContext, useContext, useEffect, useState } from "react";

export const ChatContext = createContext('');

export const ChatProvider = ({ children }) => {
    const [chatData, setChatData] = useState({});
    const [currentChat, setCurrentChat] = useState(null);
    // State for Active Chat
    const [messages, setMessages] = useState(null);
    // State for Theme 
    const [theme, setTheme] = useState('light');
    // State for reponse messages
    const [loading, setLoading] = useState('true');
    const [error, setError] = useState(null);

    // Fetching Chat json from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://devapi.beyondchats.com/api/get_all_chats?page=1`);
                if (!response.ok) {
                    throw new Error('Network reponse was not ok');
                }
                const result = await response.json();
                setChatData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    },[]);

    // Fetching Active Chat
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${currentChat}`);
                if (response.ok) {
                    const data = await response.json();
                    setMessages(data.data);
                } else {
                    console.error('Error fetching chat messages:', response.statusText);
                  }
                } catch (error) {
                  console.error('Error fetching chat messages:', error);
                }
        }
        
        if (currentChat) {
            fetchData();
        }
    },[currentChat]);

    return (
        <ChatContext.Provider value={{ 
            chatData, 
            currentChat, 
            setCurrentChat,
            messages, 
            setMessages, 
            theme, 
            setTheme, 
            loading, 
            error 
        }}>
            {children}
        </ChatContext.Provider>
    )
};

export const useChatData = () => {
    return useContext(ChatContext);
}