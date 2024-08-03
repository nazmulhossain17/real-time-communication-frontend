import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { io } from "socket.io-client";
import ChatHeader from "./ChatHeader";
import Messages from "./MessageContainer";
import MessageInput from "./InputArea";
import axios from "axios";
import { useSelector } from "react-redux";

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const socket = useRef();
  const messageEl = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:3000");
    socket.current.emit("addUser", currentUser.id);
    socket.current.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [currentUser.id]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v2/conversations",
          {
            withCredentials: true,
          }
        );
        setConversations(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getConversations();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (currentChat) {
          const res = await axios.get(
            `http://localhost:3000/message/${currentChat.id}`,
            {
              withCredentials: true,
            }
          );
          setMessages(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    messageEl.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  const handleSendMessage = async (newMessage) => {
    const message = {
      senderId: currentUser.id,
      message: newMessage,
      conversationId: currentChat.id,
    };

    try {
      const res = await axios.post(
        `http://localhost:3000/message/send/${currentChat.id}`,
        message,
        {
          withCredentials: true,
        }
      );
      setMessages([...messages, res.data.newMessage]);

      // Send message via socket
      const receiverId = currentChat.participants.find(
        (p) => p.id !== user.id
      ).id;
      socket.current.emit("sendMessage", {
        senderId: currentUser.id,
        receiverId,
        message: newMessage,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        conversations={conversations}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        currentUser={currentUser}
        onlineUsers={onlineUsers}
      />
      <div className="flex flex-col flex-1">
        {currentChat ? (
          <>
            <ChatHeader currentChat={currentChat} currentUser={currentUser} />
            <Messages
              messages={messages}
              currentUser={currentUser}
              messageEl={messageEl}
            />
            <MessageInput handleSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="flex items-center justify-center flex-1">
            <p className="text-gray-500">
              Select a conversation to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
