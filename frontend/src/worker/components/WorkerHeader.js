const WorkerHeader = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <header className="header">
      <div className="header-box">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
        />

        <div className="header-right">
          <span className="bell">🔔</span>
          <div className="profile">
            <span className="profile-name">{user.name || "Worker"}</span>
            <small>Worker Account</small>
          </div>
        </div>
      </div>
    </header>
  );
};

export default WorkerHeader;
