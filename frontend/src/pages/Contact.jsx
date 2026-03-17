import { useState } from "react";
import "../style/pages.css";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="pg">
      <div className="pg-hero">
        <h1>Get in <span>Touch</span></h1>
        <p>We're here to help 24/7. Send us a message and we'll respond within minutes.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 20, maxWidth: 920, margin: "0 auto" }}>
        {/* Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { icon: "📧", title: "Email Support", info: "support@aibanking.network", sub: "Replies within 2 hours" },
            { icon: "📞", title: "Phone Support", info: "+91 1800-000-0000", sub: "Mon–Sat · 9 AM – 8 PM" },
            { icon: "💬", title: "Live Chat", info: "Within the app", sub: "24/7 AI + human agents" },
            { icon: "🏢", title: "Head Office", info: "Hyderabad, Telangana", sub: "India – 500001" },
          ].map(c => (
            <div key={c.title} className="pg-card" style={{ padding: "20px 22px" }}>
              <span style={{ fontSize: 26, marginBottom: 10, display: "block" }}>{c.icon}</span>
              <h3 style={{ fontSize: 15 }}>{c.title}</h3>
              <p style={{ fontSize: 14, color: "#eaf2ff", margin: "4px 0 2px", fontWeight: 500 }}>{c.info}</p>
              <p style={{ fontSize: 12, color: "rgba(174,196,240,0.45)", margin: 0 }}>{c.sub}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="pg-section" style={{ margin: 0 }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <h2>Message Sent!</h2>
              <p style={{ marginTop: 8 }}>We'll get back to you at <strong>{form.email}</strong> shortly.</p>
              <button className="pg-btn" style={{ marginTop: 24 }} onClick={() => setSent(false)}>Send Another</button>
            </div>
          ) : (
            <>
              <h2>Send a Message</h2>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
                {[
                  { key: "name", placeholder: "Full name", type: "text" },
                  { key: "email", placeholder: "Email address", type: "email" },
                  { key: "subject", placeholder: "Subject", type: "text" },
                ].map(f => (
                  <input key={f.key} type={f.type} placeholder={f.placeholder} required
                    value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    style={{
                      padding: "12px 16px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(79,139,255,0.18)",
                      borderRadius: 12, color: "#eaf2ff",
                      fontSize: 14, fontFamily: "Inter,sans-serif", outline: "none"
                    }}
                  />
                ))}
                <textarea placeholder="Your message…" rows={5} required
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{
                    padding: "12px 16px", resize: "vertical",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(79,139,255,0.18)",
                    borderRadius: 12, color: "#eaf2ff",
                    fontSize: 14, fontFamily: "Inter,sans-serif", outline: "none"
                  }}
                />
                <button type="submit" className="pg-btn" style={{ alignSelf: "flex-end", padding: "12px 32px" }}>
                  Send Message →
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
