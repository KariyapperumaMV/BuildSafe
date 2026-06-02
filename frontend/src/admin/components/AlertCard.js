const AlertCard = ({ alert }) => {
  return (
    <div className={`alert-row ${alert.level}`}>
      <div className="alert-main">
        <span className={`alert-badge ${alert.level}`}>
          {alert.level.toUpperCase()}
        </span>

        <div className="alert-id">
          <img src={alert.avatar} alt={alert.name} className="row-avatar" />
          <div className="alert-info">
            <strong>• {alert.name}</strong>
            <p>
              Triggered by:{" "}
              <span className={`sensor-name ${alert.level}`}>{alert.sensor}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="alert-side">
        <span className="alert-time">{alert.time}</span>
        <div className="row-actions">
          <button className="btn-outline">View</button>
          <button className="btn-blue">Mark as Read</button>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
