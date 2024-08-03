import MessageItem from "./MessageItem";

const Messages = ({ messages, currentUser, messageEl }) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.map((m) => (
        <MessageItem key={m.id} message={m} currentUser={currentUser} />
      ))}
      <div ref={messageEl} />
    </div>
  );
};

export default Messages;
