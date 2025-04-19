import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserManagement.css"; 


function UserManagement() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3000/api/users");
    setUsers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    await axios.post("http://localhost:3000/api/users", formData);
    setFormData({ name: "", email: "" });
    fetchUsers();
    alert("User added successfully!");
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      fetchUsers();
      alert("User deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };
 

  return (
    <div className="container">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
        />
        <button type="submit">Add</button>
      </form>

      <h3>Users List</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} – {user.email}
            <button className="delete-button" onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;
