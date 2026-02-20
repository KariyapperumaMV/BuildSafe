import { useState } from "react";
import ViewUserModal from "./ViewUserModal";

const UserRow = ({ user }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`user-row ${user.status}`}>
        <div className="user-info">
          <div className="user-avatar" />
          <div>
            <strong>{user.id}</strong>
            <p>User type: {user.role}</p>
          </div>
        </div>

        <div className="user-actions">
          <button className="gray-btn" onClick={() => setOpen(true)}>
            View
          </button>
          <button className="gray-btn">Update</button>
          <button className="gray-btn">Delete</button>
        </div>
      </div>

      {open && (
        <ViewUserModal
          user={user}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default UserRow;
