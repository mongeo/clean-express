const API_BASE = "http://localhost:3001/services";

export async function fetchServices() {
  const res = await fetch(`${API_BASE}`);
  if (!res.ok) throw new Error("Failed to fetch services");
  return res.json();
}

export async function fetchServiceById(serviceId) {
  const res = await fetch(`${API_BASE}/${serviceId}`);
  if (!res.ok) throw new Error("Failed to fetch service");
  return res.json();
}

export async function createService(serviceData) {
  const res = await fetch(`${API_BASE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(serviceData),
  });
  if (!res.ok) throw new Error("Failed to create service");
  return res.json();
}

export async function updateService(serviceId, serviceData) {
  const res = await fetch(`${API_BASE}/${serviceId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(serviceData),
  });
  if (!res.ok) throw new Error("Failed to update service");
  return res.json();
}

export async function deleteService(serviceId) {
  const res = await fetch(`${API_BASE}/${serviceId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete service");
  return res.json();
}
