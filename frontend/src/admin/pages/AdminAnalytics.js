import { useEffect, useState } from "react";
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
import axios from "axios";

const COLORS = {
  safe: "#2ecc71",
  warning: "#f1c40f",
  critical: "#e74c3c",
  emergency: "#000000"
};

const AdminAnalytics = () => {

  const [avgEnvironment, setAvgEnvironment] = useState({});
  const [avgBody, setAvgBody] = useState({});
  const [alerts, setAlerts] = useState({});
  const [riskDistribution, setRiskDistribution] = useState([]);
  const [timeDistribution, setTimeDistribution] = useState([]);

  useEffect(() => {
    fetchTodayAnalytics();
  }, []);

  const fetchTodayAnalytics = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/analytics/today"
      );

      const data = res.data;

      setAvgEnvironment(data.environment);
      setAvgBody(data.body);
      setAlerts(data.alerts);
      setRiskDistribution(data.riskLevels);
      setTimeDistribution(data.timeDistribution);

    } catch (err) {
      console.error("Analytics error", err);
    }
  };

  return (

    <div className="analytics-container">

      {/* TODAY */}
      <div className="analytics-row">

        {/* Average environment */}
        <div className="analytics-card">

          <h3>Average Environment Data</h3>

          <div className="analytics-gauges">

            <div>Sound: {avgEnvironment.noise_db}</div>
            <div>Ambient Temp: {avgEnvironment.ambient_temp}</div>
            <div>Gas: {avgEnvironment.gas_ppm}</div>
            <div>UV: {avgEnvironment.uv_index}</div>

          </div>

        </div>

        {/* Total Alerts */}
        <div className="analytics-card">

          <h3>Total Alerts</h3>

          <div className="alerts-container">

            <div>Emergency: {alerts.emergency}</div>
            <div>Critical: {alerts.critical}</div>
            <div>Warning: {alerts.warning}</div>

          </div>

        </div>

      </div>

      <div className="analytics-row">

        {/* Body data */}
        <div className="analytics-card">

          <h3>Body Data</h3>

          <div>

            <div>Body Temperature: {avgBody.body_temp}</div>
            <div>Heart Rate: {avgBody.heart_rate}</div>

          </div>

        </div>

        {/* Risk level distribution */}
        <div className="analytics-card">

          <h3>Risk Level Distribution</h3>

          <ResponsiveContainer width="100%" height={260}>

            <PieChart>

              <Pie
                data={riskDistribution}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={100}
                label
              >

                {riskDistribution.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[entry.name]}
                  />
                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Time distribution */}

      <div className="analytics-card large">

        <h3>
          Average Environmental Data – Distribution by Time
        </h3>

        <ResponsiveContainer width="100%" height={320}>

          <LineChart data={timeDistribution}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="time" />
            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="ambient_temp"
              stroke="#2ecc71"
            />

            <Line
              type="monotone"
              dataKey="noise_db"
              stroke="#3498db"
            />

            <Line
              type="monotone"
              dataKey="gas_ppm"
              stroke="#f1c40f"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default AdminAnalytics;