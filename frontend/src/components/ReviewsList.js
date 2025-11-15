import React, { useEffect, useState } from "react";

import { fetchReviews } from "../services/reviewService";

export default function ReviewsList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews()
      .then(setReviews)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error loading reviews: {error}</p>;
  return (
    <table>
      <thead>
        <tr>
          <th>Review ID</th>
          <th>Appointment ID</th>
          <th>Customer ID</th>
          <th>Cleaner ID</th>
          <th>Rating</th>
          <th>Comment</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((r) => (
          <tr key={r.review_id}>
            <td>{r.review_id}</td>
            <td>{r.appointment_id}</td>
            <td>{r.customer_id}</td>
            <td>{r.cleaner_id}</td>
            <td>{r.rating}</td>
            <td>{r.comment}</td>
            <td>
              {r.created_at ? new Date(r.created_at).toLocaleString() : ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
