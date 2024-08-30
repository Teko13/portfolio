import React, { useContext, useEffect, useRef, useState } from 'react';
import "./chat.css";
import { ChatContext } from './ChatContext';
import { IoIosClose } from "react-icons/io";
import axios from 'axios';
import TypeString from '../auto_typing/TypeString';
import { MdLoop } from "react-icons/md";

const Chat = () => {
    const { chat, setChat } = useContext(ChatContext);
    const url = "https://serveur.metapressnet.com/";
    const [messages, setMessages] = useState([{ type: "bot", text: "Bonjour, je suis l'assistant virtuel de Teko Fabrice. Si vous avez des questions concernant son profil professionnel, je suis là pour ça." }]);
    const [inputMessage, setInputMessage] = useState("");
    const [statusOk, setStatusOk] = useState(false);
    const handleSendMessage = async () => {
        // const userMessage = inputMessage;
        const formData = new FormData();
        formData.append("question", inputMessage)
        setInputMessage("");
        let botMessage = "";
        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            botMessage = JSON.parse(response.data).assistant;
            setStatusOk(true);
        }
        catch (error) {
            botMessage = "Désolé une erreur est survenue";
            setStatusOk(false);
        }
        //console.log(botMessage.assistant);
        setMessages(prevMessages => [
            ...prevMessages,
            { type: "bot", text: botMessage }]);
    }
    const handlPress = (event) => {
        if (event.key === "Enter") {
            document.querySelector("#btn").click();
        }
    }
    useEffect(() => {
        const chatScreen = document.querySelector(".chat");
        chatScreen.scrollTo(0, chatScreen.scrollHeight)


    }, [messages])

    return (
        <div className={chat && "chat-body" || !chat && "chat-body closed"}>
            <div className="chat-container">
                <div className="btn-groupe">
                    <button title="Fermer la fenêtre" className="close-btn" onClick={() => setChat(!chat)}><IoIosClose className='btn-chatbot' /></button>
                    <button title='Effacer le chat' className="purge" onClick={() => setMessages([])}><MdLoop className='btn-chatbot' /></button>
                </div>
                <h3>Chat</h3>
                <div className="chat" id="chat">
                    {messages.map((message, index) => (
                        <div key={index} className="msg-container">
                            <div key={index} id={`bot-msg-${index}`} className={(!statusOk && `${message.type}-msg error`) || `${message.type}-msg`}>{(message.type === "bot" ? <TypeString text={message.text} typingdelay={20} scroll={true} scrollAreaIdentifier='.chat' refElementIdentifier={`#bot-msg-${index}`} /> : message.text)}</div>
                        </div>
                    ))}
                </div>
                <div className="form">
                    <input id="input" placeholder='Posez votre question' type="text" onKeyDown={(e) => handlPress(e)} value={inputMessage} onChange={(e) => {
                        setInputMessage(e.target.value);
                    }} />
                    <button type='submit' className='send-btn' id="btn" onClick={() => {
                        setMessages([...messages, { type: "user", text: inputMessage }]);
                        handleSendMessage();
                    }}>Envoyer</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
