import logo from "../../pictures/logo.png";
import { NavLink, useNavigate } from "react-router-dom";

const WorkerSidebar = () => {
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
        <NavLink to="/worker/dashboard" className="nav-item">
          Home
        </NavLink>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <span className="logout-icon">⏻</span> Logout
      </button>
    </aside>
  );
};

export default WorkerSidebar;
