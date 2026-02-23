// src/admin/components/UserRow.js
import { useState } from "react";
import ViewUserModal from "./ViewUserModal";
import UpdateUserModal from "./UpdateUserModal";
import DeleteUserModal from "./DeleteUserModal";

const UserRow = ({ user }) => {
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <div className={`user-row ${user.status}`}>
        <div className="user-info">
          <div className="user-avatar" />
          <div>
            <strong>{user.id}</strong>
            <p>User name: {user.name}</p>
            <p>User type: {user.role}</p>
          </div>
        </div>

        <div className="user-actions">
          <button className="gray-btn" onClick={() => setViewOpen(true)}>
            View
          </button>

          <button className="gray-btn" onClick={() => setEditOpen(true)}>
            Update
          </button>

          <button className="gray-btn" onClick={() => setDeleteOpen(true)}>
            Delete
          </button>
          
        </div>
      </div>

      {viewOpen && (
        <ViewUserModal
          user={user.raw}
          onClose={() => setViewOpen(false)}
        />
      )}

      {editOpen && (
        <UpdateUserModal
          user={user.raw}
          onClose={() => setEditOpen(false)}
        />
      )}

      {deleteOpen && (
        <DeleteUserModal
          userId={user.id}
          onClose={() => setDeleteOpen(false)}
          onConfirm={(id) => {
            console.log("Delete user:", id);
            setDeleteOpen(false);
          }}
        />
      )}
    </>
  );
};

export default UserRow;