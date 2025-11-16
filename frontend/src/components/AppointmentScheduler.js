// src/components/AppointmentsScheduler.js
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AppointmentForm from "./AppointmentForm";
import { fetchAppointments } from "../services/appointmentsService";

const locales = { "en-US": require("date-fns/locale/en-US") };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function AppointmentsScheduler() {
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Load appointments from backend and map to calendar event shape
  useEffect(() => {
    fetchAppointments()
      .then((appointments) => {
        const calendarEvents = appointments.map((appt) => ({
          id: appt.appointment_id,
          title: `${appt.service_name} - ${appt.customer_name}`,
          start: new Date(appt.start_time),
          end: new Date(appt.end_time),
        }));
        setEvents(calendarEvents);
      })
      .catch(console.error);
  }, [refreshKey]);

  // When user selects a time slot on the calendar
  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setShowForm(true);
  };

  // Called by form when booking is successful
  const handleBookingSuccess = () => {
    setShowForm(false);
    setSelectedSlot(null);
    setRefreshKey((prev) => prev + 1); // Refresh calendar events
  };

  return (
    <div>
      {showForm && selectedSlot && (
        <AppointmentForm
          initialStart={selectedSlot.start}
          initialEnd={selectedSlot.end}
          onBookingSuccess={handleBookingSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        style={{ height: 600, margin: "20px" }}
      />
    </div>
  );
}
