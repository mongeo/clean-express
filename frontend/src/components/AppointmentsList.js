import React, { useEffect, useState } from "react";

export default function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/appointments")
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading appointments...</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer ID</th>
          <th>Cleaner ID</th>
          <th>Service ID</th>
          <th>Start</th>
          <th>End</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((a) => (
          <tr key={a.appointment_id}>
            <td>{a.appointment_id}</td>
            <td>{a.customer_id}</td>
            <td>{a.cleaner_id}</td>
            <td>{a.service_id}</td>
            <td>{new Date(a.start_at).toLocaleString()}</td>
            <td>{new Date(a.end_at).toLocaleString()}</td>
            <td>{a.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
