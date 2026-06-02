import MessageItem from "./MessageItem";
import userImg from "../../pictures/user.png";

const MessagesList = () => {
  // Hardcoded message threads (preview).
  const messages = [
    {
      id: 1,
      name: "Methya Kariyapperuma",
      preview: "This is a preview of the user's mes...",
      avatar: userImg,
    },
    {
      id: 2,
      name: "Nirmani Silva",
      preview: "This is a preview of the user's mes...",
      avatar: userImg,
    },
    {
      id: 3,
      name: "Kusal Perera",
      preview: "This is a preview of the user's mes...",
      avatar: userImg,
    },
  ];

  return (
    <div className="dash-card messages-card">
      <h3 className="card-title">Messages</h3>

      <div className="messages-list">
        {messages.map((m) => (
          <MessageItem key={m.id} message={m} />
        ))}
      </div>

      <div className="card-footer">
        <span className="view-all">View All</span>
        <span className="view-all">View All ›</span>
      </div>
    </div>
  );
};

export default MessagesList;
