import React, { useEffect, useState } from "react";

export default function ServicesList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading services...</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price (cents)</th>
        </tr>
      </thead>
      <tbody>
        {services.map((s) => (
          <tr key={s.service_id}>
            <td>{s.service_id}</td>
            <td>{s.name}</td>
            <td>{s.description}</td>
            <td>{s.base_price_cents}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
