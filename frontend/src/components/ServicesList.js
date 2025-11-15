import React, { useEffect, useState } from "react";

import { fetchServices } from "../services/servicesService";

export default function ServicesList() {
  const [service, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices()
      .then(setServices)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading services...</p>;
  if (error) return <p>Error loading services: {error}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Service ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Base Duration (mins)</th>
          <th>Base Price</th>
          <th>Active?</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {service.map((s) => (
          <tr key={s.service_id}>
            <td>{s.service_id}</td>
            <td>{s.name}</td>
            <td>{s.description}</td>
            <td>{s.base_duration_min}</td>
            <td>{s.base_price_cents}</td>
            <td>{s.is_active}</td>
            <td>
              {s.created_at ? new Date(s.created_at).toLocaleString() : ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
