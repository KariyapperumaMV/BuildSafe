import { useEffect, useState } from "react";
import axios from "axios";
import UserRow from "./UserRow";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/view");

      const mappedUsers = res.data.users.map(user => ({
        id: user.userId,
        role: user.user_type,
        name: user.name,
        
        status: user.user_type === "ADMIN" ? "admin" : "safe",

        raw: user
      }));

      setUsers(mappedUsers);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="card users-card">
      <h3>Users</h3>

      <div className="users-list">
        {loading && <p>Loading users...</p>}

        {!loading && users.length === 0 && (
          <p>No users found</p>
        )}

        {!loading &&
          users.map(user => (
            <UserRow
              key={user.id}
              user={user}
              onUserChanged={fetchUsers}
            />
          ))}
      </div>
    </div>
  );
};

export default UserList;