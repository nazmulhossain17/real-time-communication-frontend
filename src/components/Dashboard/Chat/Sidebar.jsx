import React from "react";

const Sidebar = ({
  conversations,
  currentChat,
  setCurrentChat,
  currentUser,
  onlineUsers,
}) => {
  return (
    <div className="w-1/4 p-4 bg-white border-r border-gray-200">
      <h2 className="mb-4 text-xl font-semibold">Conversations</h2>
      {conversations.map((c) => (
        <div
          key={c.id}
          className={`flex items-center p-3 cursor-pointer ${
            currentChat?.id === c.id ? "bg-gray-200" : ""
          }`}
          onClick={() => setCurrentChat(c)}
        >
          <img
            className="w-10 h-10 mr-3 rounded-full"
            src={
              c.participants.find((p) => p.id !== currentUser.id)
                .profilePicture || "https://via.placeholder.com/40"
            }
            alt="User avatar"
          />
          <div>
            <p className="font-semibold">
              {c.participants.find((p) => p.id !== currentUser.id).username}
            </p>
            <p className="text-sm text-gray-500">
              {onlineUsers.includes(
                c.participants.find((p) => p.id !== currentUser.id).id
              )
                ? "Online"
                : "Offline"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
