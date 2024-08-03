import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useSocket from "../../services/socket";
import { Send } from "lucide-react";

const ChatPage = () => {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const socket = useSocket();
  const { currentUser } = useSelector((state) => state.user);
  const senderId = currentUser.data.user.id;

  console.log(userId);
  console.log(senderId);
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/message/${senderId}?senderId=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setMessages(result);
    } catch (error) {
      setError("Error fetching messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    const interval = setInterval(fetchMessages, 2000);

    if (socket) {
      socket.on("newMessage", (message) => {
        if (message.senderId === userId || message.receiverId === userId) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      });
    }

    return () => {
      clearInterval(interval);
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [userId, socket, senderId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:3000/message/send/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId,
            receiverId: userId,
            message: newMessage,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setMessages((prevMessages) => [...prevMessages, result.newMessage]);
      setNewMessage("");

      if (socket) {
        socket.emit("sendMessage", {
          senderId,
          receiverId: userId,
          message: newMessage,
        });
      }
    } catch (error) {
      setError("Error sending message.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-32 h-32 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="px-6 py-4 text-white bg-blue-600">
        <h3 className="text-xl font-semibold">Chat </h3>
      </header>
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.senderId === senderId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
                  msg.senderId === senderId
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages yet.</p>
        )}
      </div>
      <div className="px-4 py-4 border-t border-gray-200 sm:px-6">
        <div className="flex space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Send className="w-5 h-5 mr-2" />
            Send
          </button>
        </div>
      </div>
      {error && (
        <div
          className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
