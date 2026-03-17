import { useState, useEffect, useRef } from "react";
import { authApi } from "../api/bankingApi";
import { useNavigate, Link } from "react-router-dom";
import "../style/Login.css";

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 139, 255, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(79, 139, 255, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const handleLogin = async () => {
    setError("");
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Enter a valid email address");
      triggerShake();
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      triggerShake();
      return;
    }
    try {
      setLoading(true);
      const res = await authApi.login(email, password);
      localStorage.setItem("token", res.data.token);
      setSuccess(true);
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Invalid credentials";
      setError(msg);
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="login-page">
      <ParticleCanvas />

      {/* Glowing orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className={`login-card ${shake ? "shake" : ""} ${success ? "success-pop" : ""}`}>
        {/* Logo / Icon */}
        <div className="login-icon-wrap">
          <div className="login-icon">🏦</div>
        </div>

        <h1 className="login-title">AI Banking Network</h1>
        <p className="login-subtitle">Sign in to your account</p>

        {error && (
          <div className="login-error">
            <span className="error-icon">⚠️</span> {error}
          </div>
        )}

        {success && (
          <div className="login-success">
            <span>✅</span> Authenticated! Redirecting…
          </div>
        )}

        <div className="input-group">
          <span className="input-icon">✉️</span>
          <input
            id="login-email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="email"
          />
        </div>

        <div className="input-group">
          <span className="input-icon">🔒</span>
          <input
            id="login-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="current-password"
          />
        </div>

        <button
          id="login-btn"
          className={`login-btn ${loading ? "loading" : ""}`}
          onClick={handleLogin}
          disabled={loading || success}
        >
          {loading ? (
            <span className="btn-spinner" />
          ) : success ? (
            "✓ Success"
          ) : (
            "Sign In"
          )}
        </button>

        <p className="login-signup-link">
          Don't have an account?{" "}
          <Link to="/signup" className="login-signup-anchor">Sign Up</Link>
        </p>

        <p className="login-footer">
          Secured with AI · © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

export default Login;
