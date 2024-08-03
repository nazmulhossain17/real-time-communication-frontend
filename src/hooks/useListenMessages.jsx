import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { setMessages } from "../redux/messageSlice/messageSlice";

const socket = io(); // Adjust the URL if needed

const useListenMessages = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.message);

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      newMessage.shouldShake = true;
      //   const sound = new Audio("/path/to/notification.mp3");
      //   sound.play();
      dispatch(setMessages([...messages, newMessage]));
    };

    socket.on("newMessage", handleNewMessage);

    return () => socket.off("newMessage", handleNewMessage);
  }, [dispatch, messages]);

  return;
};

export default useListenMessages;
