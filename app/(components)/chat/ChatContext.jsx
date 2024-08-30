import React, { useState, createContext } from 'react';
const ChatContext = createContext(false);
const ChatContextProvider = ({ children }) => {
    const [chat, setChat] = useState(false)
    return (
        <ChatContext.Provider value={{ chat, setChat }}>
            {children}
        </ChatContext.Provider>
    );
};

export { ChatContext, ChatContextProvider };
