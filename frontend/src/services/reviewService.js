const API_BASE = "http://localhost:3001/reviews";

export async function fetchReviews() {
  const res = await fetch(`${API_BASE}`);
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}
