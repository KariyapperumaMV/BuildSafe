// Shared gauge configuration used by the Analytics page and the
// Worker dashboard so both render sensors identically.

export const SENSOR_META = {
  noise_db: {
    label: "Sound level",
    unit: "dB",
    type: "sound",
    min: 30,
    max: 100,
    thresholds: [
      { value: 30, color: "#2ecc71", label: "30" },
      { value: 80, color: "#2ecc71", label: "80" },
      { value: 90, color: "#f1c40f", label: "90" },
      { value: 100, color: "#e74c3c", label: "100" }
    ]
  },

  ambient_temp: {
    label: "Ambient temperature",
    unit: "°C",
    type: "ambient",
    min: 22,
    max: 45,
    thresholds: [
      { value: 22, color: "#2ecc71", label: "22" },
      { value: 27, color: "#2ecc71", label: "27" },
      { value: 35, color: "#f1c40f", label: "35" },
      { value: 45, color: "#e74c3c", label: "45" }
    ]
  },

  gas_ppm: {
    label: "PPM level",
    unit: "ppm",
    type: "gas",
    min: 0,
    max: 400,
    thresholds: [
      { value: 0, color: "#2ecc71", label: "0" },
      { value: 150, color: "#2ecc71", label: "150" },
      { value: 300, color: "#f1c40f", label: "300" },
      { value: 400, color: "#e74c3c", label: "400" }
    ]
  },

  uv_index: {
    label: "UV light",
    unit: "",
    type: "uv",
    min: 0,
    max: 10,
    thresholds: [
      { value: 0, color: "#2ecc71", label: "0" },
      { value: 3, color: "#2ecc71", label: "3" },
      { value: 8, color: "#f1c40f", label: "8" },
      { value: 10, color: "#e74c3c", label: "10" }
    ]
  },

  body_temp: {
    label: "Body temperature",
    unit: "°C",
    type: "body",
    min: 28,
    max: 42,
    thresholds: [
      { value: 30, color: "#e74c3c", label: "30" },
      { value: 35, color: "#f1c40f", label: "35" },
      { value: 38, color: "#2ecc71", label: "38" },
      { value: 39, color: "#f1c40f", label: "39" },
      { value: 42, color: "#e74c3c", label: "42" }
    ]
  },

  heart_rate: {
    label: "Heart rate",
    unit: "bpm",
    type: "heart",
    min: 80,
    max: 180,
    thresholds: [
      { value: 85, color: "#e74c3c", label: "85" },
      { value: 88, color: "#f1c40f", label: "88" },
      { value: 149, color: "#2ecc71", label: "149" },
      { value: 175, color: "#f1c40f", label: "175" },
      { value: 180, color: "#e74c3c", label: "180" }
    ]
  }
};
