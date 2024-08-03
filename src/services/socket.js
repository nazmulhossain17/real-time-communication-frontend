import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const useSocket = () => {
  const currentUser = useSelector((state) => state.user);

  const socket = useMemo(() => {
    if (!currentUser) return null;
    return io("http://localhost:3000", {
      query: { userId: currentUser?.id },
      withCredentials: true,
    });
  }, [currentUser]);

  useEffect(() => {
    if (!socket) return;

    console.log("Socket connected:", socket);

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return socket;
};

export default useSocket;
