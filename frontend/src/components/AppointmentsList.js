// src/components/AppointmentsList.js
import React, { useEffect, useState } from "react";
import { fetchAppointments } from "../services/appointmentsService";

export default function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments()
      .then(setAppointments)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>Error loading appointments: {error}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Appointment ID</th>
          <th>Customer ID</th>
          <th>Cleaner ID</th>
          <th>Service ID</th>
          <th>Address ID</th>
          <th>Start At</th>
          <th>End At</th>
          <th>Status</th>
          <th>Price</th>
          <th>Notes</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((a) => (
          <tr key={a.appointment_id}>
            <td>{a.appointment_id}</td>
            <td>{a.customer_id}</td>
            <td>{a.cleaner_id}</td>
            <td>{a.service_id}</td>
            <td>{a.address_id}</td>
            <td>{a.start_at ? new Date(a.start_at).toLocaleString() : ""}</td>
            <td>{a.end_at ? new Date(a.end_at).toLocaleString() : ""}</td>
            <td>{a.status}</td>
            <td>{a.price}</td>
            <td>{a.notes}</td>
            <td>{a.created_at ? new Date(a.created_at).toLocaleString() : ""}</td>
            <td>{a.updated_at ? new Date(a.updated_at).toLocaleString() : ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
