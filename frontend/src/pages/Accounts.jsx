import { useEffect, useState } from "react";
import { accountsApi } from "../api/bankingApi";
import "../style/pages.css";

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [bankName, setBankName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    try { const res = await accountsApi.list(); setAccounts(res.data); }
    catch { setError("Failed to load accounts"); }
  };

  useEffect(() => { load(); }, []);

  const create = async () => {
    setError("");
    if (!bankName || bankName.trim().length < 2) { setError("Enter a bank name (min 2 chars)"); return; }
    try {
      setLoading(true);
      await accountsApi.create({ bankName: bankName.trim() });
      setBankName(""); setShowForm(false); load();
    } catch (e) {
      setError(e?.response?.data?.message || "Creation failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="pg">
      <div className="pg-hero">
        <h1>Your <span>Accounts</span></h1>
        <p>Manage all your linked bank accounts in one place.</p>
      </div>

      {/* Add Account */}
      <div style={{ maxWidth: 820, margin: "0 auto 24px", display: "flex", justifyContent: "flex-end" }}>
        <button className="pg-btn" onClick={() => setShowForm(f => !f)}>
          {showForm ? "✕ Cancel" : "+ Link Account"}
        </button>
      </div>

      {showForm && (
        <div className="pg-section" style={{ maxWidth: 820, marginBottom: 24 }}>
          <h2>Link a New Account</h2>
          {error && <p style={{ color: "#ffb3b3", marginBottom: 12 }}>⚠️ {error}</p>}
          <div style={{ display: "flex", gap: 10 }}>
            <input
              placeholder="Bank name (e.g. HDFC Bank)"
              value={bankName}
              onChange={e => setBankName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && create()}
              style={{
                flex: 1, padding: "11px 16px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(79,139,255,0.2)",
                borderRadius: 10, color: "#eaf2ff",
                fontSize: 14, fontFamily: "Inter,sans-serif", outline: "none"
              }}
            />
            <button className="pg-btn" onClick={create} disabled={loading}>
              {loading ? "Creating…" : "Create"}
            </button>
          </div>
        </div>
      )}

      {/* Account Cards */}
      {accounts.length === 0 ? (
        <div className="pg-section" style={{ maxWidth: 820, textAlign: "center" }}>
          <p>No accounts linked yet. Click <strong>Link Account</strong> to get started.</p>
        </div>
      ) : (
        <div className="pg-grid" style={{ maxWidth: 1100, margin: "0 auto" }}>
          {accounts.map(a => (
            <div key={a.id} className="pg-card">
              <span className="pg-card-icon">🏦</span>
              <h3>{a.bankName}</h3>
              <div style={{ fontSize: 13, color: "rgba(174,196,240,0.5)", marginBottom: 8 }}>
                A/C: {a.accountNumber} &nbsp;|&nbsp; IFSC: {a.ifsc}
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#4f8bff" }}>
                ₹{a.balance?.toLocaleString("en-IN")}
              </div>
              <div style={{ fontSize: 11, color: "rgba(174,196,240,0.35)", marginTop: 6 }}>
                Opened {new Date(a.createdAt).toLocaleDateString("en-IN")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Accounts;
