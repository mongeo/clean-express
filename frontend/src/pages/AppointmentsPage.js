// src/pages/DashboardPage.js (or AppointmentsPage.js)
import React from "react";
import AppointmentsCalendar from "../components/AppointmentsCalendar";

export default function DashboardPage() {
  return (
    <div>
      <h1>Scheduler Dashboard</h1>
      <AppointmentsCalendar />
    </div>
  );
}
