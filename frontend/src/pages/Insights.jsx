import { useEffect, useState } from "react";
import { analyticsApi } from "../api/bankingApi";
import "./Article.css";

function Insights() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    analyticsApi.transactions()
      .then((res) => setData(res.data))
      .catch(() => setError("Failed to load insights"));
  }, []);

  if (error) return <div className="article"><div className="error">{error}</div></div>;
  if (!data) return <div className="article"><p>Loading insights...</p></div>;

  return (
    <div className="article">
      <div className="article-header">
        <h1>AI Transaction Insights</h1>
        <p>Automated analysis across your recent transactions.</p>
      </div>
      <div className="article-body">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          <div className="card"><strong>Total</strong><div>{data.totalCount} tx</div></div>
          <div className="card"><strong>Amount</strong><div>₹{data.totalAmount.toFixed(2)}</div></div>
          <div className="card"><strong>Avg / Std</strong><div>₹{data.avgAmount.toFixed(2)} / {data.stdAmount.toFixed(2)}</div></div>
        </div>
        <div style={{ marginTop: 12 }}>
          <strong>Breakdown:</strong> Deposits {data.depositsCount}, Withdrawals {data.withdrawalsCount}
        </div>
        <div style={{ marginTop: 12 }}>
          <strong>Top Keywords:</strong> {data.topKeywords && data.topKeywords.length ? data.topKeywords.join(", ") : "None"}
        </div>
        <div style={{ marginTop: 12 }}>
          <strong>Anomalies:</strong>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {data.anomalies && data.anomalies.length ? data.anomalies.map((a) => (
              <li key={a.id} style={{ padding: 10, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, marginBottom: 8 }}>
                <div><strong>{a.type}</strong> · ₹{a.amount} · {new Date(a.createdAt).toLocaleString()}</div>
                <div>{a.description}</div>
                <div style={{ opacity: 0.8 }}>Reason: {a.reason}</div>
              </li>
            )) : <li>No anomalies detected</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Insights;
