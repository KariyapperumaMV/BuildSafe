import { useState } from "react";

const AdminReports = () => {
  const [userId, setUserId] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [timeRange, setTimeRange] = useState("today");

  // Sample recent reports (wire to backend later).
  const recentReports = [
    { userId: "USER_002", name: "Methya Kariyapperuma", time: "5 hours ago" },
    { userId: "USER_005", name: "Nirmani Silva", time: "1 day ago" },
  ];

  const handleGenerateReport = () => {
    console.log("Generate report with:", { userId, selectAll, timeRange });
    // TODO: load all available users dynamically + connect backend
    alert("Generate report clicked (backend not connected yet)");
  };

  return (
    <>
      {/* ===== Generate Report ===== */}
      <div className="dash-card report-generate">
        <div className="report-form">
          <h3 className="card-title">Generate Report</h3>

          <div className="form-row">
            <label>User ID</label>
            <select
              className="report-select"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              disabled={selectAll}
            >
              <option value="">Select user</option>
              <option value="USER_0001">USER_0001</option>
              <option value="USER_0002">USER_0002</option>
            </select>
          </div>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={(e) => {
                setSelectAll(e.target.checked);
                if (e.target.checked) setUserId("");
              }}
            />
            Select all users
          </label>

          <div className="form-row">
            <label>Time</label>
            <select
              className="report-select"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="last_7_days">Last 7 days</option>
              <option value="last_30_days">Last 30 days</option>
            </select>
          </div>

          <button className="btn-blue generate-btn" onClick={handleGenerateReport}>
            Generate Report
          </button>
        </div>

        <div className="report-illustration" aria-hidden="true">
          📊
        </div>
      </div>

      {/* ===== Recent Reports ===== */}
      <div className="dash-card recent-reports">
        <h3 className="card-title">Recent Reports</h3>

        <table className="reports-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Generated Time</th>
              <th className="action-col">Action</th>
            </tr>
          </thead>
          <tbody>
            {recentReports.map((r, i) => (
              <tr key={i}>
                <td>{r.userId}</td>
                <td className="report-name">{r.name}</td>
                <td className="muted">{r.time}</td>
                <td className="action-col">
                  <button className="btn-blue">View Report</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="card-footer">
          <button className="btn-outline">View All</button>
          <span className="view-all">View All ›</span>
        </div>
      </div>
    </>
  );
};

export default AdminReports;
