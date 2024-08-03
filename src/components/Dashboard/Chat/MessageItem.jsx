import React from "react";

const MessageItem = ({ message, currentUser }) => {
  return (
    <div
      className={`flex mb-4 ${
        message.senderId === currentUser.id ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          message.senderId === currentUser.id
            ? "bg-blue-500 text-white"
            : "bg-gray-200"
        }`}
      >
        {message.message}
      </div>
    </div>
  );
};

export default MessageItem;
