import { useEffect, useState } from "react";
import { dashboardApi, transactionsApi } from "../api/bankingApi";
import "../style/Dashboard.css";

function Dashboard() {
  const [data, setData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [newTx, setNewTx] = useState({ amount: "", type: "DEPOSIT", description: "" });
  const [editing, setEditing] = useState(null);
  const [editValues, setEditValues] = useState({ amount: "", type: "", description: "" });
  const [filterType, setFilterType] = useState("ALL");
  const [query, setQuery] = useState("");

  const loadAll = async () => {
    try {
      const [dash, txs] = await Promise.all([dashboardApi.get(), transactionsApi.list()]);
      setData(dash.data);
      setTransactions(txs.data);
    } catch {
      alert("Unauthorized");
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const createTx = async () => {
    try {
      const payload = {
        amount: parseFloat(newTx.amount),
        type: newTx.type,
        description: newTx.description,
      };
      if (!payload.amount || payload.amount <= 0 || !Number.isFinite(payload.amount)) {
        alert("Enter a valid amount greater than 0");
        return;
      }
      if (!payload.description || payload.description.length < 2) {
        alert("Enter a meaningful description");
        return;
      }
      await transactionsApi.create(payload);
      setNewTx({ amount: "", type: "DEPOSIT", description: "" });
      loadAll();
    } catch {
      alert("Failed to create transaction");
    }
  };

  const startEdit = (tx) => {
    setEditing(tx.id);
    setEditValues({ amount: tx.amount, type: tx.type, description: tx.description });
  };

  const saveEdit = async (id) => {
    try {
      const payload = {
        amount: parseFloat(editValues.amount),
        type: editValues.type,
        description: editValues.description,
      };
      await transactionsApi.update(id, payload);
      setEditing(null);
      loadAll();
    } catch {
      alert("Failed to update transaction");
    }
  };

  const deleteTx = async (id) => {
    try {
      await transactionsApi.delete(id);
      loadAll();
    } catch {
      alert("Failed to delete transaction");
    }
  };

  if (!data) return <h3>Loading...</h3>;

  const filtered = transactions
    .filter((t) => (filterType === "ALL" ? true : t.type === filterType))
    .filter((t) => (query ? (t.description || "").toLowerCase().includes(query.toLowerCase()) : true))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const deposits = filtered.filter((t) => t.type === "DEPOSIT").reduce((s, t) => s + t.amount, 0);
  const withdraws = filtered.filter((t) => t.type === "WITHDRAW").reduce((s, t) => s + t.amount, 0);

  return (
    <div className="dashboard">
      <h2>Welcome {data.name}</h2>
      <h3>Balance: ₹{data.balance}</h3>
      <div className="ai-box">
        <p>{data.aiMessage}</p>
      </div>

      <div className="transactions">
        <h3>Transactions</h3>
        <div className="tx-filters">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="ALL">All</option>
            <option value="DEPOSIT">Deposits</option>
            <option value="WITHDRAW">Withdrawals</option>
          </select>
          <input
            type="text"
            placeholder="Search description"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="tx-summary">
            <span>Deposits: ₹{deposits.toFixed(2)}</span>
            <span>Withdrawals: ₹{withdraws.toFixed(2)}</span>
          </div>
        </div>
        <div className="tx-form">
          <input
            type="number"
            placeholder="Amount"
            value={newTx.amount}
            onChange={(e) => setNewTx({ ...newTx, amount: e.target.value })}
          />
        <select
            value={newTx.type}
            onChange={(e) => setNewTx({ ...newTx, type: e.target.value })}
          >
            <option value="DEPOSIT">DEPOSIT</option>
            <option value="WITHDRAW">WITHDRAW</option>
          </select>
          <input
            type="text"
            placeholder="Description"
            value={newTx.description}
            onChange={(e) => setNewTx({ ...newTx, description: e.target.value })}
          />
          <button onClick={createTx}>Add</button>
        </div>

        <ul className="tx-list">
          {filtered.map((tx) => (
            <li key={tx.id} className="tx-item">
              {editing === tx.id ? (
                <>
                  <input
                    type="number"
                    value={editValues.amount}
                    onChange={(e) => setEditValues({ ...editValues, amount: e.target.value })}
                  />
                  <select
                    value={editValues.type}
                    onChange={(e) => setEditValues({ ...editValues, type: e.target.value })}
                  >
                    <option value="DEPOSIT">DEPOSIT</option>
                    <option value="WITHDRAW">WITHDRAW</option>
                  </select>
                  <input
                    type="text"
                    value={editValues.description}
                    onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
                  />
                  <button onClick={() => saveEdit(tx.id)}>Save</button>
                  <button onClick={() => setEditing(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span>{tx.type}</span>
                  <span>₹{tx.amount}</span>
                  <span>{tx.description}</span>
                  <span>{new Date(tx.createdAt).toLocaleString()}</span>
                  <button onClick={() => startEdit(tx)}>Edit</button>
                  <button onClick={() => deleteTx(tx.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
