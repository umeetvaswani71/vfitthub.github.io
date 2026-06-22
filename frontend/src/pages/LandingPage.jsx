import { Activity, ArrowRightCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { API_BASE } from "../lib/api.js";
import "./LandingPage.css";

const demoCredentials = {
  admin: { email: "admin@vfitt.com", password: "admin123" },
  client: { email: "client@vfitt.com", password: "client123" },
};

export default function LandingPage({ mode, setMode, onLogin }) {
  const [form, setForm] = useState(demoCredentials[mode]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    role: mode,
  });

  useEffect(() => {
    setForm(demoCredentials[mode]);
    setRegisterForm((current) => ({ ...current, role: mode }));
    setShowRegister(false);
    setError("");
  }, [mode]);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/auth/${mode}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Invalid email, password, or module");
      }

      onLogin(await response.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function signInWithGoogle() {
    setShowRegister(true);
    setError("");
  }

  function toggleBmiView() {
    setShowBmi((current) => !current);
    setShowRegister(false);
    setError("");
  }

  function handleRegister(event) {
    event.preventDefault();

    if (!registerForm.name || !registerForm.email) {
      setError("Please complete all registration fields.");
      return;
    }

    onLogin({
      id: Date.now(),
      name: registerForm.name,
      email: registerForm.email,
      role: registerForm.role === "admin" ? "ADMIN" : "CLIENT",
    });
  }

  return (
    <main className="login-shell">
      <section className="brand-panel">
        <div className="brand-mark">
          <Activity size={34} />
        </div>
        <h1>VFitt Hub</h1>
        <p>Access personalized nutrition and workout management for clients.</p>
        <div className="stats-row">
          <span>Exercises:</span>
          <strong>800+</strong>
          <span>Transformed Clients:</span>
          <strong>90+</strong>
        </div>
      </section>

      <section className="login-panel">
        <div className="page-header">
          <h2>{mode === "admin" ? "Admin Login" : "Client Login"}</h2>
          <p>Access your {mode === "admin" ? "admin" : "client"} dashboard at {mode === "admin" ? "/admin" : "/user"}.</p>
        </div>

        <div className="auth-panel">
          <button className="google-button" onClick={signInWithGoogle}>
            <ArrowRightCircle size={18} />
            Continue with Google
          </button>

          <div className="divider">or</div>

          {showRegister ? (
            <form onSubmit={handleRegister} className="auth-form">
              <label>
                Full Name
                <input
                  type="text"
                  value={registerForm.name}
                  onChange={(event) => setRegisterForm({ ...registerForm, name: event.target.value })}
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={registerForm.email}
                  onChange={(event) => setRegisterForm({ ...registerForm, email: event.target.value })}
                  required
                />
              </label>
              <button className="primary-button" type="submit">
                Register as {mode === "admin" ? "Admin" : "Client"}
              </button>
            </form>
          ) : (
            <form onSubmit={submit} className="auth-form">
              <label>
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  required
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  value={form.password}
                  onChange={(event) => setForm({ ...form, password: event.target.value })}
                  required
                />
              </label>
              {error && <p className="error">{error}</p>}
              <button className="primary-button" type="submit" disabled={loading}>
                {loading ? "Signing in..." : `Login as ${mode}`}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
