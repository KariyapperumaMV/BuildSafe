import { useState } from "react";
import UserList from "../components/UserList";
import AddUserModal from "../components/AddUserModal";

const AdminUsers = () => {
  const [showAddUser, setShowAddUser] = useState(false);

  return (
    <>
      <div className="users-toolbar">
        <input
          type="text"
          placeholder="Search User"
          className="search-input"
        />
        <button
          className="primary-btn"
          onClick={() => setShowAddUser(true)}
        >
          Add User
        </button>
      </div>

      <UserList />

      {showAddUser && (
        <AddUserModal onClose={() => setShowAddUser(false)} />
      )}
    </>
  );
};

export default AdminUsers;