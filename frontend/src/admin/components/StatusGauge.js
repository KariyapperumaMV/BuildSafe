// Half-donut gauge used on the dashboard Alerts card to show
// Safe / Warning / Critical worker counts.

const polarToCartesian = (cx, cy, r, angleDeg) => {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
};

const arcPath = (cx, cy, r, startAngle, endAngle) => {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
};

const StatusGauge = ({ value = 0, max = 10, color = "#2ecc71", label }) => {
  const safeMax = max > 0 ? max : 1;
  const clamped = Math.min(Math.max(value, 0), safeMax);
  const ratio = clamped / safeMax;
  const angle = ratio * 180 - 90; // -90 (left) .. +90 (right)

  const cx = 100;
  const cy = 100;
  const r = 80;

  return (
    <div className="status-gauge">
      <svg viewBox="-10 -10 220 120" width="150">
        {/* background track */}
        <path
          d={arcPath(cx, cy, r, -90, 90)}
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
        />

        {/* value arc */}
        <path
          d={arcPath(cx, cy, r, -90, angle)}
          stroke={color}
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
        />

        {/* needle */}
        <line
          x1={cx}
          y1={cy}
          x2={cx}
          y2={cy - 62}
          stroke="#fff"
          strokeWidth="3"
          style={{
            transform: `rotate(${angle}deg)`,
            transformOrigin: "100px 100px",
            transition: "transform 0.4s ease",
          }}
        />
        <circle cx={cx} cy={cy} r="5" fill="#fff" />

        {/* scale labels */}
        <text x="6" y="108" fontSize="12" fill="rgba(255,255,255,0.55)" textAnchor="middle">0</text>
        <text x="194" y="108" fontSize="12" fill="rgba(255,255,255,0.55)" textAnchor="middle">{max}</text>
      </svg>

      <div className="status-gauge-value" style={{ color }}>{value}</div>
      <div className="status-gauge-label">{label}</div>
    </div>
  );
};

export default StatusGauge;
