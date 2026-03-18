import { useEffect, useState } from "react";
import axios from "axios";

function Database() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/debug/users");
        setUsers(res.data);
      } catch (err) {
        setError("Failed to fetch database data. Make sure backend is running on 8080.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "40px", color: "#eaf2ff", background: "#0b1e3b", minHeight: "100vh" }}>
      <h1>Database View (Users)</h1>
      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "#ff4f4f" }}>{error}</p>}
      {!loading && !error && (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <th style={{ textAlign: "left", padding: "10px" }}>ID</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Name</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Email</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Bank Name</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Account No</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Balance</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "10px" }}>{u.id}</td>
                <td style={{ padding: "10px" }}>{u.name}</td>
                <td style={{ padding: "10px" }}>{u.email}</td>
                <td style={{ padding: "10px" }}>{u.bankName}</td>
                <td style={{ padding: "10px" }}>{u.accountNumber}</td>
                <td style={{ padding: "10px" }}>₹{u.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div style={{ marginTop: "30px" }}>
        <a href="/login" style={{ color: "#4f8bff", textDecoration: "none" }}>← Back to Login</a>
      </div>
    </div>
  );
}

export default Database;
