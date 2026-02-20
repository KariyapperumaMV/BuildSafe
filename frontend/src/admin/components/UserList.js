// src/components/UserList.js
import UserRow from "./UserRow";

const UserList = () => {
  const users = [
    { id: "U001", role: "Worker", status: "safe" },
    { id: "U002", role: "Worker", status: "critical" },
    { id: "U003", role: "Worker", status: "emergency" },
    { id: "U004", role: "Worker", status: "warning" },
    { id: "U005", role: "Admin", status: "safe" }
  ];

  return (
    <div className="card users-card">
      <h3>Users</h3>

      <div className="users-list">
        {users.map(user => (
          <UserRow key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
