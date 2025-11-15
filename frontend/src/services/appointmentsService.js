const API_BASE = "http://localhost:3001/appointments";

export async function fetchAppointments() {
  const res = await fetch(`${API_BASE}`);
  if (!res.ok) throw new Error("Failed to fetch appointments");
  return res.json();
}

export async function fetchAppointmentById(appointmentId) {
  const res = await fetch(`${API_BASE}/${appointmentId}`);
  if (!res.ok) throw new Error("Failed to fetch appointment");
  return res.json();
}

export async function createAppointment(appointmentData) {
  const res = await fetch(`${API_BASE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointmentData),
  });
  if (!res.ok) throw new Error("Failed to create appointment");
  return res.json();
}

export async function updateAppointment(appointmentId, appointmentData) {
  const res = await fetch(`${API_BASE}/${appointmentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointmentData),
  });
  if (!res.ok) throw new Error("Failed to update appointment");
  return res.json();
}

export async function deleteAppointment(appointmentId) {
  const res = await fetch(`${API_BASE}/${appointmentId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete appointment");
  return res.json();
}
