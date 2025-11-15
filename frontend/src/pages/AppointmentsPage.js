// frontend/src/pages/AppointmentsPage.js

import React, { useEffect, useState } from "react";
import { fetchAppointments } from "../services/appointmentsService";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments()
      .then(setAppointments)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Appointments</h1>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul>
          {appointments.map((a) => (
            <li key={a.appointment_id}>
              Service: {a.service_id} <br />
              Date: {new Date(a.start_at).toLocaleDateString()} <br />
              Customer: {a.customer_id} <br />
              Status: {a.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
