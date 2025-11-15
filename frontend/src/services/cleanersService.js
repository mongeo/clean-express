const API_BASE = "http://localhost:3001/cleaners";

export async function fetchCleaners() {
  const res = await fetch(`${API_BASE}`);
  if (!res.ok) throw new Error("Failed to fetch cleaners");
  return res.json();
}
