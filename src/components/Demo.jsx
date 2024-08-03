import React, { useState } from "react";
import useSocket from "../services/socket";
import UserList from "./User/UserList";
import ChatWindow from "./User/ChatWindow";

const Demo = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const socket = useSocket();
  return (
    <div className="chat-app">
      <UserList onSelectUser={setSelectedUser} />
      {selectedUser && (
        <ChatWindow selectedUser={selectedUser} socket={socket} />
      )}
    </div>
  );
};

export default Demo;
