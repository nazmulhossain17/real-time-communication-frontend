import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useGetMessages = (messageId) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useSelector((state) => state.auth); // Assuming you have auth state

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/message/${messageId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Add token to headers
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }

        const data = await response.json();
        setMessages(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [messageId, token]); // Dependencies include messageId and token

  return { messages, error };
};

export default useGetMessages;
