const API_BASE = "http://localhost:3001/payments";

export async function fetchPayments() {
  const res = await fetch(`${API_BASE}`);
  if (!res.ok) throw new Error("Failed to fetch payments");
  return res.json();
}
