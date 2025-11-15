import React, { useEffect, useState } from "react";
import { fetchPayments} from "../services/paymentsService";

export default function PaymentsList() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPayments()
      .then(setPayments)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
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
          <th>Created At</th>
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
              {p.created_at ? new Date(p.captured_at).toLocaleString() : ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
