// src/admin/pages/AdminUsers.js
import UserList from "../components/UserList";

const AdminUsers = () => {
  return (
    <>
      <div className="users-toolbar">
        <input
          type="text"
          placeholder="Search User"
          className="search-input"
        />
        <button className="primary-btn">Add User</button>
      </div>

      <UserList />
    </>
  );
};

export default AdminUsers;
