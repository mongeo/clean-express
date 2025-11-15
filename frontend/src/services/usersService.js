const API_BASE = "http://localhost:3001/users";

export async function fetchUsers() {
  const res = await fetch(`${API_BASE}`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function fetchUserById(userId) {
  const res = await fetch(`${API_BASE}/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function createUser(userData) {
  const res = await fetch(`${API_BASE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Failed to create user");
  return res.json();
}

export async function updateUser(userId, userData) {
  const res = await fetch(`${API_BASE}/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
}

export async function deleteUser(userId) {
  const res = await fetch(`${API_BASE}/${userId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
}
