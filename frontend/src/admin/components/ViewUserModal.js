// src/admin/components/ViewUserModal.js
const ViewUserModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {/* Header */}
        <div className="modal-header">
          <span className={`status-badge ${user.status}`}>
            {user.status}
          </span>
        </div>

        <div className="modal-body">
          {/* Left panel */}
          <div className="modal-left">
            <div className="user-avatar large" />

            <p>User ID: {user.userId}</p>

            <p>User Name: {user.name}</p>
            <p>User Type: {user.user_type}</p>
            <p>NIC: {user.nic}</p>
            <p>Phone No: {user.phone}</p>
            <p>Email: {user.email}</p>
            <p>Helmet: {user.helmet || "Not assigned"}</p>
          </div>

          {/* Right panel */}
          <div className="modal-right">
            <div className="modal-section">
              <h4>Body data</h4>
              <div className="gauge-row">
                <div className="gauge">Body Temp</div>
                <div className="gauge">Heart Rate</div>
              </div>
            </div>

            <div className="modal-section">
              <h4>Environment data</h4>
              <div className="gauge-row">
                <div className="gauge">Sound</div>
                <div className="gauge">Temp</div>
                <div className="gauge">PPM</div>
                <div className="gauge">UV</div>
              </div>
            </div>

            <div className="modal-section">
              <h4>Location</h4>
              <div className="map-box">Open in Google Maps</div>
            </div>

            <div className="modal-section">
              <h4>Summary</h4>
              <div className="summary-box" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="gray-btn" onClick={onClose}>Close</button>
          <button className="gray-btn">Update</button>
          <button className="gray-btn">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal;