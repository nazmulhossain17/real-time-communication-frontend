import React from "react";

const ChatHeader = ({ currentChat, currentUser }) => {
  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <h2 className="text-xl font-semibold">
        {currentChat.participants.find((p) => p.id !== currentUser.id).name}
      </h2>
    </div>
  );
};

export default ChatHeader;
