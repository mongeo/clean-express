import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import UsersPage from "./pages/UsersPage";
//import AppointmentsPage from "./pages/AppointmentsPage";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import logo from "./assets/cleaner_logo.png"; 
import AppointmentDash from "./pages/AppointmentDash";

function Header() {
  return (
    <header style={{ background: "#0077cc", padding: "1rem", color: "white" }}>
      <img
        src={logo}
        alt="Logo"
        style={{ height: "30px", marginRight: "1rem" }}
      />
      <nav>
        <NavLink
          to="/dashboard"
          style={{ margin: "0 10px" }}
          activeStyle={{ fontWeight: "bold" }}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/services"
          style={{ margin: "0 10px" }}
          activeStyle={{ fontWeight: "bold" }}
        >
          Services
        </NavLink>
        <NavLink
          to="/appointments"
          style={{ margin: "0 10px" }}
          activeStyle={{ fontWeight: "bold" }}
        >
          Appointments
        </NavLink>
      </nav>
    </header>
  );
}

export default function App() {
  return (
    <Router>
      <Header />
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/appointments" element={<AppointmentDash />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </main>
    </Router>
  );
}
