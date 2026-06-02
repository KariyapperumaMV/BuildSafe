const MessageItem = ({ message }) => {
  return (
    <div className="message-row">
      <img src={message.avatar} alt={message.name} className="row-avatar" />

      <div className="msg-info">
        <strong>{message.name}</strong>
        <p>{message.preview}</p>
      </div>

      <div className="row-actions">
        <button className="btn-outline">View</button>
        <button className="btn-blue">Mark as Read</button>
      </div>
    </div>
  );
};

export default MessageItem;
