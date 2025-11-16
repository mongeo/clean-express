// src/components/AppointmentForm.js
import React, { useState } from 'react';

export default function AppointmentForm({ initialStart, initialEnd, onBookingSuccess, onCancel }) {
  const [serviceId, setServiceId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState(initialStart.toISOString().slice(0, 10));  // YYYY-MM-DD
  const [startTime, setStartTime] = useState(initialStart.toISOString().slice(11, 16)); // HH:mm
  const [duration, setDuration] = useState(
    (initialEnd.getTime() - initialStart.getTime()) / 60000 || 60
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const startDateTime = new Date(`${date}T${startTime}`);

      const appointmentData = {
        service_id: 6,
        customer_id: 31,
        address_id: 41,
        start_at: startDateTime.toISOString(),
        end_at: startDateTime.toISOString() + 60,
        status: "pending",
        price_cents: 1,
        currency: "USD"
      };

      const response = await fetch('http://localhost:3001/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to book appointment');
      }

      onBookingSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 20, margin: 20 }}>
      <h3>Book Appointment</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Service ID: <br />
          <input value={serviceId} onChange={(e) => setServiceId(e.target.value)} required />
        </label>
        <br /><br />
        <label>
          Customer Name: <br />
          <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
        </label>
        <br /><br />
        <label>
          Date: <br />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <br /><br />
        <label>
          Start Time: <br />
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </label>
        <br /><br />
        <label>
          Duration (minutes): <br />
          <input
            type="number"
            min="15"
            max="240"
            value="60"
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </label>
        <br /><br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Booking...' : 'Book Appointment'}
        </button>{' '}
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}
