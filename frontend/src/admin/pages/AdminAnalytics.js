import { useEffect, useState } from "react";
import axios from "axios";

import SensorGauge from "../components/SensorGauge";
import { SENSOR_META } from "../components/sensorMeta";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis
} from "recharts";

/* =====================================================
   CHART COLORS
===================================================== */

const RISK_COLORS = {
  safe: "#2ecc71",
  warning: "#f1c40f",
  critical: "#e74c3c",
  emergency: "#b06bff"
};

const TABS = [
  { key: "today", label: "Today" },
  { key: "week", label: "Week" },
  { key: "month", label: "Month" }
];

/* =====================================================
   COMPONENT
===================================================== */

const AdminAnalytics = () => {

  const [range, setRange] = useState("today");

  const [avgEnvironment, setAvgEnvironment] = useState({});
  const [avgBody, setAvgBody] = useState({});
  const [alerts, setAlerts] = useState({});
  const [riskLevels, setRiskLevels] = useState([]);
  const [timeDistribution, setTimeDistribution] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, [range]);

  const fetchAnalytics = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/analytics/today?range=${range}`
      );

      const data = res.data;

      setAvgEnvironment(data.environment || {});
      setAvgBody(data.body || {});
      setAlerts(data.alerts || {});
      setRiskLevels(data.riskLevels || []);
      setTimeDistribution(data.timeDistribution || []);

    } catch (err) {
      console.error("Analytics fetch error:", err);
    }

  };

  const totalWorkers = riskLevels.reduce((sum, r) => sum + r.value, 0);

  const getRisk = (name) =>
    riskLevels.find((r) => r.name === name)?.value || 0;

  return (

    <div className="analytics-container">

      {/* TABS */}
      <div className="analytics-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`tab ${range === t.key ? "active" : ""}`}
            onClick={() => setRange(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TOP ROW */}
      <div className="analytics-top">

        {/* Average Environment */}
        <div className="dash-card analytics-card">

          <h3 className="card-title">Average Environment Data</h3>

          <div className="gauge-row">

            <SensorGauge
              {...SENSOR_META.noise_db}
              value={avgEnvironment.noise_db}
              classifyType="sound"
            />

            <SensorGauge
              {...SENSOR_META.ambient_temp}
              value={avgEnvironment.ambient_temp}
              classifyType="ambient"
            />

            <SensorGauge
              {...SENSOR_META.gas_ppm}
              value={avgEnvironment.gas_ppm}
              classifyType="gas"
            />

            <SensorGauge
              {...SENSOR_META.uv_index}
              value={avgEnvironment.uv_index}
              classifyType="uv"
            />

          </div>

        </div>

        {/* Total Alerts */}
        <div className="dash-card analytics-card">

          <h3 className="card-title">Total Alerts</h3>

          <div className="total-alerts-list">

            <div className="alert-stat-row">
              <span className="alert-dot emergency" />
              <span className="alert-stat-label">Emergency Alerts</span>
              <span className="alert-stat-count">{alerts.emergency || 0}</span>
            </div>

            <div className="alert-stat-row">
              <span className="alert-dot critical" />
              <span className="alert-stat-label">Critical Alerts</span>
              <span className="alert-stat-count">{alerts.critical || 0}</span>
            </div>

            <div className="alert-stat-row">
              <span className="alert-dot warning" />
              <span className="alert-stat-label">Warning Alerts</span>
              <span className="alert-stat-count">{alerts.warning || 0}</span>
            </div>

            <div className="alert-stat-row">
              <span className="alert-dot safe" />
              <span className="alert-stat-label">Safe Alerts</span>
              <span className="alert-stat-count">{alerts.safe || 0}</span>
            </div>

          </div>

          <div className="card-footer single">
            <span className="view-all">View All ›</span>
          </div>

        </div>

      </div>

      {/* SECOND ROW */}
      <div className="analytics-bottom">

        {/* Body Data */}
        <div className="dash-card analytics-card">

          <h3 className="card-title">Body Data</h3>

          <div className="gauge-row">

            <SensorGauge
              {...SENSOR_META.body_temp}
              value={avgBody.body_temp}
              classifyType="body"
            />

            <SensorGauge
              {...SENSOR_META.heart_rate}
              value={avgBody.heart_rate}
              classifyType="heart"
            />

          </div>

          <div className="card-footer single">
            <span className="view-all">View Detailed Report ›</span>
          </div>

        </div>

        {/* Risk Distribution */}
        <div className="dash-card analytics-card">

          <h3 className="card-title">Risk Level Distribution</h3>

          <div className="risk-row">

            <div className="risk-chart">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={riskLevels}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {riskLevels.map((entry, index) => (
                      <Cell key={index} fill={RISK_COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="risk-legend">
              <div className="legend-item">
                <span className="legend-dot safe" />
                <span className="legend-count">{getRisk("safe")}</span> Safe
              </div>
              <div className="legend-item">
                <span className="legend-dot warning" />
                <span className="legend-count">{getRisk("warning")}</span> Warning
              </div>
              <div className="legend-item">
                <span className="legend-dot critical" />
                <span className="legend-count">{getRisk("critical")}</span> Critical
              </div>
            </div>

          </div>

          <div className="card-footer">
            <span className="view-all">View Users List</span>
            <span className="view-all">View All ›</span>
          </div>

        </div>

      </div>

      {/* TIME DISTRIBUTION */}
      <div className="dash-card analytics-card">

        <h3 className="card-title">
          Average Environment Data – Distribution According To Time
        </h3>

        <ResponsiveContainer width="100%" height={280}>

          <LineChart data={timeDistribution}>

            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />

            <XAxis dataKey="time" stroke="rgba(255,255,255,0.6)" />

            <YAxis stroke="rgba(255,255,255,0.6)" />

            <Tooltip
              contentStyle={{
                background: "#1b1745",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "10px",
                color: "#fff"
              }}
            />

            <Line type="monotone" dataKey="ambient_temp" stroke="#2ecc71" strokeWidth={2} />
            <Line type="monotone" dataKey="noise_db" stroke="#3498db" strokeWidth={2} />
            <Line type="monotone" dataKey="gas_ppm" stroke="#f1c40f" strokeWidth={2} />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

};

export default AdminAnalytics;
