// frontend/src/pages/HomePage.js

import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>Cleaner Service App - Dashboard</h1>
      <ul>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/appointments">Appointments</Link>
        </li>
        <li>
          <Link to="/cleaners">Cleaners</Link>
        </li>
        <li>
          <Link to="/payments">Payments</Link>
        </li>
        <li>
          <Link to="/reviews">Reviews</Link>
        </li>
      </ul>
    </div>
  );
}
