import { NavLink } from "react-router-dom";
import "../style/pages.css";

const serviceData = {
  savings: {
    icon: "🐷", title: "Savings Account", color: "#4f8bff",
    tagline: "Grow your money with zero hidden fees.",
    features: ["Up to 7% annual interest rate", "Free instant transfers", "Round-up auto-savings", "Instant transaction alerts", "No minimum balance"],
    eligibility: "Available to all verified users aged 18+. Simply complete your KYC and link your mobile number.",
    steps: ["Sign up and complete KYC", "Go to Dashboard → Accounts", "Click 'Open Savings Account'", "Start depositing and earning interest automatically"],
  },
  cards: {
    icon: "💳", title: "Debit & Credit Cards", color: "#7c3aff",
    tagline: "Secure cards with rewards and smart spending limits.",
    features: ["Dynamic spending controls", "1.5% cashback on all purchases", "Zero forex markup on international use", "Instant block/unblock via app", "EMI conversion on any purchase"],
    eligibility: "Debit cards available to all account holders. Credit cards require income verification (min ₹25,000/month).",
    steps: ["Request card from your Account settings", "Complete card KYC", "Card delivered within 3–5 business days", "Activate via app or ATM"],
  },
  business: {
    icon: "💼", title: "Business Banking", color: "#06c",
    tagline: "Accounts, payroll, and lending tailored for growth.",
    features: ["Multi-user access with role controls", "Automated payroll & invoicing", "GST-ready current accounts", "Overdraft facility up to ₹50L", "Free NEFT/RTGS/IMPS"],
    eligibility: "Available for registered sole proprietors, LLPs, Pvt Ltd companies with valid GST number.",
    steps: ["Register your business entity", "Upload GST certificate + PAN", "Account opened in 24 hours", "Access business dashboard with analytics"],
  },
  insurance: {
    icon: "🛡️", title: "Insurance", color: "#00c896",
    tagline: "Comprehensive coverage options for life, health, and vehicles.",
    features: ["Term life insurance from ₹399/year", "Health cover up to ₹1 crore", "Motor insurance with instant claim", "AI-based claim processing", "Zero paperwork claims"],
    eligibility: "Open to all account holders aged 18–65. Premium amounts vary by age and sum assured.",
    steps: ["Go to Services → Insurance", "Select coverage type", "Get instant premium quote", "Pay and receive e-policy within minutes"],
  },
  wealth: {
    icon: "📈", title: "Wealth Management", color: "#f59e0b",
    tagline: "AI-powered investing with transparent fees and real returns.",
    features: ["Mutual fund SIPs from ₹100/month", "AI portfolio rebalancing", "Stocks, ETFs, and gold on one platform", "Tax-loss harvesting", "Financial advisor on call"],
    eligibility: "Open to all verified users. Advanced features available for accounts with ₹50,000+ invested.",
    steps: ["Complete your risk profile quiz", "Connect your bank account", "Choose SIP amount and fund category", "Portfolio auto-managed by AI"],
  },
  international: {
    icon: "🌍", title: "International Banking", color: "#06b6d4",
    tagline: "Global transfers with the best FX rates and instant speed.",
    features: ["Transfer to 180+ countries", "Best-in-class FX rates", "Real-time tracking", "SWIFT & SEPA support", "No hidden charges"],
    eligibility: "Available to all verified account holders within LRS (Liberalized Remittance Scheme) limits.",
    steps: ["Verify your PAN for forex", "Add beneficiary account", "Choose transfer amount and currency", "Funds delivered in 1–3 business days"],
  },
};

function ServicePage({ serviceKey }) {
  const s = serviceData[serviceKey];
  if (!s) return null;
  return (
    <div className="pg">
      <NavLink to="/services" className="pg-back">← Back to Services</NavLink>
      <div className="pg-hero">
        <h1>{s.icon} {s.title}</h1>
        <p>{s.tagline}</p>
      </div>
      <div className="pg-section">
        <h2>✨ Key Features</h2>
        <ul>{s.features.map((f, i) => <li key={i}>{f}</li>)}</ul>
      </div>
      <div className="pg-section">
        <h2>✅ Eligibility</h2>
        <p>{s.eligibility}</p>
      </div>
      <div className="pg-section">
        <h2>🚀 How to Get Started</h2>
        <ol style={{ paddingLeft: 20, margin: 0 }}>
          {s.steps.map((step, i) => (
            <li key={i} style={{ color: "rgba(174,196,240,0.7)", lineHeight: 1.8, marginBottom: 6 }}>{step}</li>
          ))}
        </ol>
      </div>
      <div className="pg-cta">
        <h2>Ready to get started?</h2>
        <p>Open your account in minutes and access all our services.</p>
        <NavLink to="/signup" className="pg-btn">Create Account →</NavLink>
      </div>
    </div>
  );
}

export function ServiceSavings() { return <ServicePage serviceKey="savings" />; }
export function ServiceCards() { return <ServicePage serviceKey="cards" />; }
export function ServiceBusiness() { return <ServicePage serviceKey="business" />; }
export function ServiceInsurance() { return <ServicePage serviceKey="insurance" />; }
export function ServiceWealth() { return <ServicePage serviceKey="wealth" />; }
export function ServiceInternational() { return <ServicePage serviceKey="international" />; }

export default ServicePage;
