import logo from "../../pictures/logo.png";
import { NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="BuildSafe logo" />
      </div>

      <nav>
        <NavLink to="/admin/dashboard" className="nav-item">
          Home
        </NavLink>

        <NavLink to="/admin/users" className="nav-item">
          Users
        </NavLink>

        <NavLink to="/admin/reports" className="nav-item">
          Reports
        </NavLink>

        <NavLink to="/admin/analytics" className="nav-item">
          Analytics
        </NavLink>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <span className="logout-icon">⏻</span> Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
