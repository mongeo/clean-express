import React, { useEffect, useState } from "react";

export default function ReviewsList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading reviews...</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Appointment</th>
          <th>Customer</th>
          <th>Cleaner</th>
          <th>Rating</th>
          <th>Comment</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}
