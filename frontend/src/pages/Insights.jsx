import { useEffect, useState } from "react";
import { analyticsApi } from "../api/bankingApi";
import "../style/pages.css";

function Insights() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    analyticsApi.transactions()
      .then(res => setData(res.data))
      .catch(() => setError("Failed to load insights"));
  }, []);

  if (error) return (
    <div className="pg">
      <div className="pg-hero"><h1>AI Transaction <span>Insights</span></h1></div>
      <div className="pg-section"><p style={{color:"#ffb3b3"}}>⚠️ {error}</p></div>
    </div>
  );
  if (!data) return (
    <div className="pg">
      <div className="pg-hero"><h1>AI Transaction <span>Insights</span></h1><p>Loading your analytics…</p></div>
    </div>
  );

  return (
    <div className="pg">
      <div className="pg-hero">
        <h1>AI Transaction <span>Insights</span></h1>
        <p>Automated analysis powered by AI across your recent transaction history.</p>
      </div>

      {/* Stats */}
      <div className="pg-stats">
        <div className="pg-stat">
          <div className="pg-stat-val">{data.totalCount}</div>
          <div className="pg-stat-lbl">Total Transactions</div>
        </div>
        <div className="pg-stat">
          <div className="pg-stat-val">₹{data.totalAmount?.toFixed(0)}</div>
          <div className="pg-stat-lbl">Total Volume</div>
        </div>
        <div className="pg-stat">
          <div className="pg-stat-val">₹{data.avgAmount?.toFixed(0)}</div>
          <div className="pg-stat-lbl">Average Amount</div>
        </div>
        <div className="pg-stat">
          <div className="pg-stat-val">{data.depositsCount}</div>
          <div className="pg-stat-lbl">Deposits</div>
        </div>
        <div className="pg-stat">
          <div className="pg-stat-val">{data.withdrawalsCount}</div>
          <div className="pg-stat-lbl">Withdrawals</div>
        </div>
        <div className="pg-stat">
          <div className="pg-stat-val">{data.stdAmount?.toFixed(1)}</div>
          <div className="pg-stat-lbl">Std Deviation</div>
        </div>
      </div>

      {/* Top Keywords */}
      {data.topKeywords?.length > 0 && (
        <div className="pg-section">
          <h2>🔍 Top Spending Keywords</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
            {data.topKeywords.map((k, i) => <span key={i} className="pg-tag">{k}</span>)}
          </div>
        </div>
      )}

      {/* Anomalies */}
      <div className="pg-section">
        <h2>⚠️ Anomaly Detection</h2>
        {!data.anomalies?.length ? (
          <p style={{ color: "#6dffc0" }}>✅ No anomalies detected in your transactions.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
            {data.anomalies.map(a => (
              <div key={a.id} style={{
                padding: "14px 18px", borderRadius: 12,
                background: "rgba(255,80,80,0.06)", border: "1px solid rgba(255,80,80,0.2)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontWeight: 600, color: "#ffb3b3" }}>{a.type}</span>
                  <span style={{ fontSize: 13, color: "rgba(174,196,240,0.55)" }}>
                    {new Date(a.createdAt).toLocaleString("en-IN")}
                  </span>
                </div>
                <div style={{ fontSize: 15, color: "#eaf2ff", marginBottom: 4 }}>₹{a.amount} · {a.description}</div>
                <div style={{ fontSize: 12.5, color: "rgba(174,196,240,0.55)" }}>🤖 {a.reason}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Insights;
