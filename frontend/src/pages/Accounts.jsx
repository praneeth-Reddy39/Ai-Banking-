import { useEffect, useState } from "react";
import { accountsApi } from "../api/bankingApi";
import "./Article.css";

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [bankName, setBankName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const res = await accountsApi.list();
      setAccounts(res.data);
    } catch {
      setError("Failed to load accounts");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    setError("");
    if (!bankName || bankName.length < 2) {
      setError("Enter bank name");
      return;
    }
    try {
      setLoading(true);
      await accountsApi.create({ bankName });
      setBankName("");
      load();
    } catch (e) {
      setError(e?.response?.data?.message || "Creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="article">
      <div className="article-header">
        <h1>Your Accounts</h1>
        <p>Create and manage multiple bank accounts.</p>
      </div>
      <div className="article-body">
        {error && <div className="error">{error}</div>}
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input
            placeholder="Bank name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
          <button onClick={create} disabled={loading}>{loading ? "Creating..." : "Create Account"}</button>
        </div>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {accounts.map((a) => (
            <li key={a.id} style={{ padding: 10, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, marginBottom: 8 }}>
              <strong>{a.bankName}</strong> · {a.accountNumber} · {a.ifsc} · ₹{a.balance}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Accounts;
