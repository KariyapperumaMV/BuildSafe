# BuildSafe

A real-time safety monitoring platform for construction and industrial workers. IoT-enabled smart helmets stream live sensor data (gas, temperature, heart rate, UV, noise, GPS) to a central backend, where it is classified into safety statuses (`SAFE` / `WARNING` / `CRITICAL` / `EMERGENCY`) and surfaced to administrators through a web dashboard. Admins can monitor workers in real time, review analytics, manage users, and send remote commands back to helmets.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Data Models](#data-models)
- [Known Limitations & Roadmap](#known-limitations--roadmap)

---

## Features

- **Live helmet telemetry** — helmets POST sensor packets that are validated, classified, and stored.
- **Emergency handling** — dedicated emergency endpoint plus a command queue so admins can remotely reset a helmet's emergency state.
- **Admin dashboard** — worker status gauges (Safe / Warning / Critical), an alerts feed, a messages panel, and weather at a glance.
- **User management** — full CRUD with NIC / phone / email validation and auto-generated user IDs.
- **Reports** — generate per-user or all-user reports over a selectable time range, plus a recent-reports table.
- **Analytics** — average sensor gauges, total alert counts, risk-level distribution donut, and an hourly trend chart, with **Today / Week / Month** range tabs.
- **Worker dashboard** — each worker sees their own helmet's live gauges, current safety status, a personal 7-day trend, and messages.
- **7-day history** — daily averaged sensor data per helmet for reporting.
- **Role-based views & session** — separate `ADMIN` and `WORKER` interfaces; the logged-in user (with their assigned helmet) is persisted client-side, with a logout action in the sidebar.

## Architecture

```text
┌─────────────┐   sensor packets    ┌──────────────────┐        ┌────────────┐
│ Smart Helmet│ ──────────────────► │  Express Backend │ ─────► │  MongoDB   │
│  (IoT)      │ ◄────────────────── │  (REST API)      │ ◄───── │            │
└─────────────┘   reset commands    └──────────────────┘        └────────────┘
                                              ▲
                                              │  REST (axios)
                                              ▼
                                     ┌──────────────────┐
                                     │  React Frontend  │
                                     │  Admin / Worker  │
                                     └──────────────────┘
```

The helmet pushes normal and emergency data packets to the backend and **polls** `/api/helmet/command/:helmetId` to pick up queued commands (e.g. `RESET_EMERGENCY`).

## Tech Stack

| Layer     | Technology                                              |
| --------- | ------------------------------------------------------- |
| Frontend  | React 19, React Router 7, Recharts, Axios               |
| Backend   | Node.js, Express 5, Mongoose 9                           |
| Database  | MongoDB                                                  |
| Dev tools | nodemon                                                  |

> Note: `socket.io` / `socket.io-client` are installed as dependencies, but real-time alerts currently use console logging and polling rather than WebSocket push (see [Roadmap](#known-limitations--roadmap)).

## Project Structure

```text
BuildSafe/
├── Backend/
│   ├── app.js                 # Express app, middleware, route registration
│   ├── server.js              # Entry point (loads env, connects DB, listens)
│   ├── config/
│   │   ├── database.js         # Mongoose connection
│   │   └── config.env          # Environment variables (gitignored)
│   ├── controllers/            # auth, user, helmet, analytics logic
│   ├── models/                 # User, HelmetData, HelmetCommand schemas
│   ├── routes/                 # auth, user, helmet, analytics routes
│   └── seedWorkerData.js       # Dev helper: seed realistic data for a helmet
└── frontend/
    └── src/
        ├── admin/              # Admin layout, pages, components
        │   └── components/     # incl. SensorGauge, StatusGauge, sensorMeta
        ├── worker/             # Worker layout & personalised dashboard
        ├── auth/               # Login (persists user to localStorage)
        ├── services/           # API helpers
        └── styles/             # CSS
```

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB instance (local or MongoDB Atlas)

### 1. Backend

```bash
cd Backend
npm install
```

Create `Backend/config/config.env` (see [Environment Variables](#environment-variables)), then start the server:

```bash
npm run dev    # nodemon (auto-reload)
# or
npm start      # node server.js
```

The API runs on `http://localhost:5000` by default.

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

The app runs on `http://localhost:3000` and expects the backend at `http://localhost:5000`.

### 3. (Optional) Seed demo data

To populate a helmet with realistic sensor readings (a current reading + 7 days of history) for demos:

```bash
cd Backend
node seedWorkerData.js
```

Edit the `HELMET_ID` constant in `seedWorkerData.js` to target a different helmet. This **replaces** existing data for that helmet.

## Environment Variables

Create `Backend/config/config.env`:

```env
DB_URI=mongodb://localhost:27017/buildsafe
PORT=5000
```

| Variable | Description                          |
| -------- | ------------------------------------ |
| `DB_URI` | MongoDB connection string            |
| `PORT`   | Backend port (defaults to `5000`)    |

## API Reference

Base URL: `http://localhost:5000/api`

### Auth

| Method | Endpoint      | Description                                                  |
| ------ | ------------- | ------------------------------------------------------------ |
| POST   | `/auth/login` | Log in with `userId` + password; returns the user (incl. `helmet`) |

### Users

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| POST   | `/users/add`          | Create a user     |
| GET    | `/users/view`         | List all users    |
| PUT    | `/users/update/:userId` | Update a user   |
| DELETE | `/users/delete/:userId` | Delete a user   |

### Helmet

| Method | Endpoint                       | Description                              |
| ------ | ------------------------------ | ---------------------------------------- |
| POST   | `/helmet/data`                 | Receive a normal sensor packet           |
| POST   | `/helmet/emergency`            | Receive an emergency packet              |
| POST   | `/helmet/reset`                | Queue a `RESET_EMERGENCY` command        |
| GET    | `/helmet/command/:helmetId`    | Helmet polls for pending commands        |
| GET    | `/helmet/available`            | List helmet IDs with recorded data       |
| GET    | `/helmet/latest/:helmetId`     | Latest data for a helmet                 |
| GET    | `/helmet/last7days/:helmetId`  | 7-day daily averages for a helmet        |

### Analytics

| Method | Endpoint           | Description                                                              |
| ------ | ------------------ | ------------------------------------------------------------------------ |
| GET    | `/analytics/today` | Averages, alert counts (incl. `safe`), risk distribution & trend. Accepts `?range=today\|week\|month` (today → hourly buckets, week/month → daily buckets). |

## Data Models

**User** — `userId`, `name`, `nic`, `phoneNo`, `email`, `password`, `user_type` (`ADMIN` \| `WORKER`), `helmet`

**HelmetData** — `helmetId`, `timestamp`, `sensors` (`gas_ppm`, `ambient_temp`, `body_temp`, `heart_rate`, `uv_index`, `noise_db`, `gps`), `status` (`overall`, `critical_sensors[]`, `warning_sensors[]`)

**HelmetCommand** — `helmetId`, `command` (`RESET_EMERGENCY`), `status` (`PENDING` \| `COMPLETED`)

## Known Limitations & Roadmap

These are current shortcuts in the codebase that should be addressed before production use:

- **Password security** — passwords are stored and compared in **plain text**. `bcrypt` is already a dependency; hash on create/update and compare on login.
- **Authentication** — login persists the user to `localStorage` (no expiry, readable by any script) and issues **no session token or JWT**. API routes are unprotected, so anyone can call user/helmet/analytics endpoints. Add token-based auth, server-side sessions, and route/role guards.
- **Hardcoded API URLs** — the frontend hardcodes `http://localhost:5000` across many files. Extract a configurable API base URL (e.g. via `frontend/src/services/api.js` and an env var) — the service file currently exists but is empty.
- **Real-time alerts** — critical/emergency alerts only `console.log` on the server. `socket.io` is installed but unused; wire up WebSocket push to the dashboard.
- **Input validation** — `/helmet/emergency` and `/helmet/data` do only minimal validation; consider a schema validator (e.g. Joi/Zod).
- **Timezone** — aggregations are hardcoded to `Asia/Colombo`; make this configurable.
- **Tests** — no backend tests exist yet.

## License

ISC
