// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./admin/layout/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminUsers from "./admin/pages/AdminUsers";
import Login from "./auth/Login";

//styles
import "./styles/admin.css";
import "./styles/login.css";

function App() {
  return (
    <BrowserRouter>Rgfx1
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        
        {/*Admin Routes*/}
        <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

