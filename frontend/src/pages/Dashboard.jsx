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
  const [addOpen, setAddOpen] = useState(false);

  const loadAll = async () => {
    try {
      const [dash, txs] = await Promise.all([dashboardApi.get(), transactionsApi.list()]);
      setData(dash.data);
      setTransactions(txs.data);
    } catch {
      // handled silently
    }
  };

  useEffect(() => { loadAll(); }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const createTx = async () => {
    const payload = { amount: parseFloat(newTx.amount), type: newTx.type, description: newTx.description };
    if (!payload.amount || payload.amount <= 0 || !Number.isFinite(payload.amount)) return alert("Enter a valid amount > 0");
    if (!payload.description || payload.description.length < 2) return alert("Enter a description");
    try {
      await transactionsApi.create(payload);
      setNewTx({ amount: "", type: "DEPOSIT", description: "" });
      setAddOpen(false);
      loadAll();
    } catch { alert("Failed to create transaction"); }
  };

  const startEdit = (tx) => { setEditing(tx.id); setEditValues({ amount: tx.amount, type: tx.type, description: tx.description }); };
  const saveEdit = async (id) => {
    try {
      await transactionsApi.update(id, { amount: parseFloat(editValues.amount), type: editValues.type, description: editValues.description });
      setEditing(null); loadAll();
    } catch { alert("Update failed"); }
  };
  const deleteTx = async (id) => { try { await transactionsApi.delete(id); loadAll(); } catch { alert("Delete failed"); } };

  if (!data) return (
    <div className="dash-loading">
      <div className="dash-spinner" />
      <p>Loading your dashboard…</p>
    </div>
  );

  const filtered = transactions
    .filter(t => filterType === "ALL" || t.type === filterType)
    .filter(t => !query || (t.description || "").toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const totalDeposits = transactions.filter(t => t.type === "DEPOSIT").reduce((s, t) => s + t.amount, 0);
  const totalWithdraws = transactions.filter(t => t.type === "WITHDRAW").reduce((s, t) => s + t.amount, 0);

  return (
    <div className="dash">
      {/* Header */}
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Welcome back, <span>{data.name}</span> 👋</h1>
          <p className="dash-sub">Here's your financial overview</p>
        </div>
        <button className="dash-logout" onClick={logout}>Logout</button>
      </div>

      {/* Stats */}
      <div className="dash-stats">
        <div className="dash-stat">
          <div className="dash-stat-icon">💰</div>
          <div className="dash-stat-label">Balance</div>
          <div className="dash-stat-value">₹{data.balance?.toLocaleString("en-IN") ?? "0"}</div>
        </div>
        <div className="dash-stat green">
          <div className="dash-stat-icon">📈</div>
          <div className="dash-stat-label">Total Deposits</div>
          <div className="dash-stat-value">₹{totalDeposits.toLocaleString("en-IN")}</div>
        </div>
        <div className="dash-stat red">
          <div className="dash-stat-icon">📉</div>
          <div className="dash-stat-label">Total Withdrawals</div>
          <div className="dash-stat-value">₹{totalWithdraws.toLocaleString("en-IN")}</div>
        </div>
        <div className="dash-stat purple">
          <div className="dash-stat-icon">🔄</div>
          <div className="dash-stat-label">Transactions</div>
          <div className="dash-stat-value">{transactions.length}</div>
        </div>
      </div>

      {/* AI Message */}
      {data.aiMessage && (
        <div className="dash-ai">
          <span className="dash-ai-icon">🤖</span>
          <p>{data.aiMessage}</p>
        </div>
      )}

      {/* Transactions */}
      <div className="dash-panel">
        <div className="dash-panel-head">
          <h2>Transactions</h2>
          <button className="dash-add-btn" onClick={() => setAddOpen(o => !o)}>
            {addOpen ? "✕ Cancel" : "+ New Transaction"}
          </button>
        </div>

        {/* Add Form */}
        {addOpen && (
          <div className="dash-tx-form">
            <input type="number" placeholder="Amount (₹)" value={newTx.amount}
              onChange={e => setNewTx({ ...newTx, amount: e.target.value })} />
            <select value={newTx.type} onChange={e => setNewTx({ ...newTx, type: e.target.value })}>
              <option value="DEPOSIT">Deposit</option>
              <option value="WITHDRAW">Withdraw</option>
            </select>
            <input type="text" placeholder="Description" value={newTx.description}
              onChange={e => setNewTx({ ...newTx, description: e.target.value })} />
            <button className="dash-submit-btn" onClick={createTx}>Add</button>
          </div>
        )}

        {/* Filters */}
        <div className="dash-filters">
          <div className="dash-filter-tabs">
            {["ALL", "DEPOSIT", "WITHDRAW"].map(t => (
              <button key={t} className={`dash-tab ${filterType === t ? "active" : ""}`}
                onClick={() => setFilterType(t)}>
                {t === "ALL" ? "All" : t === "DEPOSIT" ? "Deposits" : "Withdrawals"}
              </button>
            ))}
          </div>
          <input className="dash-search" type="text" placeholder="🔍 Search…"
            value={query} onChange={e => setQuery(e.target.value)} />
        </div>

        {/* List */}
        <div className="dash-tx-list">
          {filtered.length === 0 && <p className="dash-empty">No transactions found.</p>}
          {filtered.map(tx => (
            <div key={tx.id} className={`dash-tx ${tx.type === "DEPOSIT" ? "dep" : "wit"}`}>
              {editing === tx.id ? (
                <div className="dash-tx-edit">
                  <input type="number" value={editValues.amount}
                    onChange={e => setEditValues({ ...editValues, amount: e.target.value })} />
                  <select value={editValues.type}
                    onChange={e => setEditValues({ ...editValues, type: e.target.value })}>
                    <option value="DEPOSIT">Deposit</option>
                    <option value="WITHDRAW">Withdraw</option>
                  </select>
                  <input type="text" value={editValues.description}
                    onChange={e => setEditValues({ ...editValues, description: e.target.value })} />
                  <button onClick={() => saveEdit(tx.id)}>Save</button>
                  <button onClick={() => setEditing(null)}>Cancel</button>
                </div>
              ) : (
                <>
                  <div className="dash-tx-left">
                    <span className="dash-tx-badge">{tx.type === "DEPOSIT" ? "↑" : "↓"}</span>
                    <div>
                      <div className="dash-tx-desc">{tx.description || "—"}</div>
                      <div className="dash-tx-date">{new Date(tx.createdAt).toLocaleString("en-IN")}</div>
                    </div>
                  </div>
                  <div className="dash-tx-right">
                    <span className="dash-tx-amt">{tx.type === "DEPOSIT" ? "+" : "−"}₹{tx.amount?.toLocaleString("en-IN")}</span>
                    <div className="dash-tx-actions">
                      <button onClick={() => startEdit(tx)}>✏️</button>
                      <button onClick={() => deleteTx(tx.id)}>🗑️</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
