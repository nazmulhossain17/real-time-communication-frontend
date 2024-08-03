// src/components/ChatWindow.jsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMessages, sendMessage } from "../../services/api";
import { toast } from "react-toastify";

const ChatWindow = ({ selectedUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser || !selectedUser) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await getMessages(selectedUser.id);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    if (socket) {
      const handleNewMessage = (message) => {
        if (
          message.senderId === selectedUser.id ||
          message.receiverId === selectedUser.id
        ) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      };

      socket.on("newMessage", handleNewMessage);

      return () => {
        socket.off("newMessage", handleNewMessage);
      };
    }
  }, [selectedUser.id, currentUser, socket]);

  const handleSendMessage = async () => {
    if (!currentUser || !newMessage.trim()) return;

    try {
      const response = await sendMessage(selectedUser.id, newMessage.trim());
      setMessages((prevMessages) => [
        ...prevMessages,
        response.data.newMessage,
      ]);
      setNewMessage("");

      if (socket) {
        socket.emit("sendMessage", {
          senderId: currentUser.id,
          receiverId: selectedUser.id,
          message: newMessage.trim(),
        });
        toast.success("sent");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-window">
      <h3>Chat with {selectedUser.name}</h3>
      <div className="messages">
        {loading ? (
          <p>Loading...</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.senderId === currentUser.id ? "sent" : "received"
              }`}
            >
              {msg.message}
            </div>
          ))
        )}
      </div>
      <div className="send-message">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
