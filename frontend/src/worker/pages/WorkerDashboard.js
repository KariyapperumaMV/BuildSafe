import { useEffect, useState } from "react";
import axios from "axios";

import WeatherCard from "../../admin/components/WeatherCard";
import MessagesList from "../../admin/components/MessagesList";
import SensorGauge from "../../admin/components/SensorGauge";
import { SENSOR_META } from "../../admin/components/sensorMeta";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const WorkerDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const helmetId = user.helmet;

  const [latest, setLatest] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!helmetId) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const [latestRes, historyRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/helmet/latest/${helmetId}`),
          axios.get(`http://localhost:5000/api/helmet/last7days/${helmetId}`)
        ]);

        setLatest(latestRes.data);

        // last7days returns an object keyed by day -> turn into an array
        const days = historyRes.data || {};
        const arr = Object.keys(days)
          .sort()
          .map((day) => ({ day: day.slice(5), ...days[day] }));
        setHistory(arr);
      } catch (err) {
        console.error("Worker dashboard fetch error:", err);
        if (err.response?.status === 404) {
          setError("No sensor data has been recorded for your helmet yet.");
        } else {
          setError("Unable to load your helmet data. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [helmetId]);

  // ---- No helmet assigned ----
  if (!helmetId) {
    return (
      <div className="dash-card">
        <h3 className="card-title">My Helmet</h3>
        <div className="empty-state">
          No helmet is assigned to your account yet. Please contact your
          administrator.
        </div>
      </div>
    );
  }

  const sensors = latest?.sensors || {};
  const status = latest?.status?.overall || "—";

  return (
    <div className="worker-dashboard">
      <div className="dashboard-top">
        <WeatherCard />

        <div className="dash-card worker-status-card">
          <h3 className="card-title">My Status</h3>
          <div className={`status-badge ${status.toLowerCase()}`}>{status}</div>
          <p className="worker-helmet-id">Helmet: {helmetId}</p>
        </div>
      </div>

      {error && <div className="dash-card empty-state">{error}</div>}

      {!error && (
        <>
          {/* Live environment readings */}
          <div className="dash-card analytics-card">
            <h3 className="card-title">Environment</h3>
            <div className="gauge-row">
              <SensorGauge {...SENSOR_META.noise_db} value={sensors.noise_db} classifyType="sound" />
              <SensorGauge {...SENSOR_META.ambient_temp} value={sensors.ambient_temp} classifyType="ambient" />
              <SensorGauge {...SENSOR_META.gas_ppm} value={sensors.gas_ppm} classifyType="gas" />
              <SensorGauge {...SENSOR_META.uv_index} value={sensors.uv_index} classifyType="uv" />
            </div>
          </div>

          <div className="analytics-bottom">
            {/* Live body readings */}
            <div className="dash-card analytics-card">
              <h3 className="card-title">Body</h3>
              <div className="gauge-row">
                <SensorGauge {...SENSOR_META.body_temp} value={sensors.body_temp} classifyType="body" />
                <SensorGauge {...SENSOR_META.heart_rate} value={sensors.heart_rate} classifyType="heart" />
              </div>
            </div>

            {/* 7-day history */}
            <div className="dash-card analytics-card">
              <h3 className="card-title">My 7-Day Trend</h3>
              {history.length === 0 ? (
                <div className="empty-state">No history available yet.</div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={history}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.6)" />
                    <YAxis stroke="rgba(255,255,255,0.6)" />
                    <Tooltip
                      contentStyle={{
                        background: "#1b1745",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: "10px",
                        color: "#fff"
                      }}
                    />
                    <Line type="monotone" dataKey="body_temp" stroke="#2ecc71" strokeWidth={2} />
                    <Line type="monotone" dataKey="heart_rate" stroke="#e74c3c" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Messages */}
          <MessagesList />
        </>
      )}

      {loading && !latest && !error && (
        <div className="dash-card empty-state">Loading your helmet data…</div>
      )}
    </div>
  );
};

export default WorkerDashboard;
