import StatusGauge from "./StatusGauge";
import AlertCard from "./AlertCard";
import userImg from "../../pictures/user.png";

const AlertsList = () => {
  // Worker status counts (placeholder — wire to /api/analytics/today later).
  const counts = { safe: 10, warning: 5, critical: 4 };
  const total = counts.safe + counts.warning + counts.critical;

  // Alerts are raised when a device sends an EMERGENCY packet or a worker's
  // status changes to WARNING / CRITICAL. Sample data shown until the
  // real-time alert feed is wired up.
  const alerts = [
    {
      id: 1,
      level: "critical",
      name: "Methya Kariyapperuma",
      sensor: "Gas Sensor",
      time: "5 mins ago",
      avatar: userImg,
    },
    {
      id: 2,
      level: "warning",
      name: "Nirmani Silva",
      sensor: "Temperature",
      time: "20 mins ago",
      avatar: userImg,
    },
  ];

  return (
    <div className="dash-card alerts-card">
      <h3 className="card-title">Alerts</h3>

      <div className="alerts-gauges">
        <StatusGauge value={counts.safe} max={total} color="#2ecc71" label="Safe" />
        <StatusGauge value={counts.warning} max={total} color="#f1c40f" label="Warning" />
        <StatusGauge value={counts.critical} max={total} color="#e74c3c" label="Critical" />
      </div>

      <div className="alerts-list">
        {alerts.length === 0 ? (
          <div className="empty-state">No active alerts</div>
        ) : (
          alerts.map((alert) => <AlertCard key={alert.id} alert={alert} />)
        )}
      </div>

      <div className="card-footer">
        <span className="view-all">View All</span>
        <span className="view-all">View All ›</span>
      </div>
    </div>
  );
};

export default AlertsList;
