import { createContext, useState } from "react";
import axios from "axios";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const BACKEND_API =
    import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  const [messages, setMessages] = useState([]);
  const [currentReceiver, setCurrentReceiver] = useState(null);

  const sendMessage = async (receiver, content) => {
    try {
      const { data } = await axios.post(
        `${BACKEND_API}/message/send-message/${receiver}`,
        {
          content,
        },
        {
          withCredentials: true,
        }
      );

      if (data.data) {
        setMessages((prevMessages) => [...(prevMessages || []), data.data]);
      }
      return data;
    } catch (error) {
      console.error("Send message error:", error);
      return error.response?.data || { message: "Failed to send message" };
    }
  };

  const getMessages = async (receiver) => {
    if (!receiver) return;

    try {
      const { data } = await axios.get(
        `${BACKEND_API}/message/get-messages/${receiver}`,
        {
          withCredentials: true,
        }
      );

      setMessages(data.data || []);
      setCurrentReceiver(receiver);
      return data;
    } catch (error) {
      console.error("Get messages error:", error);
      return error.response?.data || { message: "Failed to get messages" };
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setCurrentReceiver(null);
  };

  return (
    <MessageContext.Provider
      value={{
        getMessages,
        sendMessage,
        messages,
        clearMessages,
        currentReceiver,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
