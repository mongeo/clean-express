import React, { useEffect, useState } from "react";

import { fetchUsers } from "../services/usersService";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>User ID</th>
          <th>Role</th>
          <th>Name ID</th>
          <th>Email</th>
          <th>Phone #</th>
          <th>Password Hash</th>
          <th>Active?</th>
          <th>Created</th>
          <th>Updated</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.user_id}>
            <td>{u.user_id}</td>
            <td>{u.role}</td>
            <td>{u.full_name}</td>
            <td>{u.email}</td>
            <td>{u.phone_e164}</td>
            <td>{u.password_hash}</td>
            <td>{u.is_active}</td>
            <td>{u.created_at ? new Date(u.created_at).toLocaleString() : ""}</td>
            <td>{u.updated_at ? new Date(u.updated_at).toLocaleString() : ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
