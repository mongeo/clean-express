// src/components/AppointmentsCalendar.js
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { fetchAppointments } from "../services/appointmentsService"; // your API fetch

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function AppointmentsCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchAppointments()
      .then((appointments) => {
        // Map your appointments to event objects for the calendar
        // Each event needs: title, start, end (Date objects)
        const calendarEvents = appointments.map((appt) => ({
          id: appt.appointment_id,
          title: appt.service_name + " - " + appt.customer_name,
          start: new Date(appt.start_time), // adapt your datetime fields here
          end: new Date(appt.end_time), // you might add duration to start_time
        }));
        setEvents(calendarEvents);
      })
      .catch(console.error);
  }, []);

  const handleSelectSlot = ({ start, end }) => {
    alert(`Selected slot from ${start} to ${end}`);
    // You can open a modal or form to create a new appointment here
  };

  return (
    <div style={{ height: 600 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        defaultView="week"
      />
    </div>
  );
}
