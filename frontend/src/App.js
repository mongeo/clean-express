import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import UsersPage from "./pages/UsersPage";

function Header() {
  return (
    <header style={{ background: "#0077cc", padding: "1rem", color: "white" }}>
      <nav>
        <NavLink
          to="/users"
          style={{ margin: "0 10px" }}
          activeStyle={{ fontWeight: "bold" }}
        >
          Users
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
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </main>
    </Router>
  );
}
