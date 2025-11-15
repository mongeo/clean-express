import React, { useEffect, useState } from "react";

export default function PaymentsList() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/payments")
      .then((res) => res.json())
      .then((data) => {
        setPayments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading payments...</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Appointment ID</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Provider</th>
          <th>Captured At</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((p) => (
          <tr key={p.payment_id}>
            <td>{p.payment_id}</td>
            <td>{p.appointment_id}</td>
            <td>{p.amount_cents}</td>
            <td>{p.payment_status}</td>
            <td>{p.provider}</td>
            <td>
              {p.captured_at ? new Date(p.captured_at).toLocaleString() : ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
