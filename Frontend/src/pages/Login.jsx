import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imp from "/public/ashok_symbol.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const contentType = response.headers.get("content-type");
      let data = {};
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = { message: await response.text() };
      }

      if (response.ok) {
        setMessage({ text: data.message || "Logged in successfully!", type: "success" });
        setTimeout(() => {
          navigate("/dashboard");
        }, 600);
      } else {
        setMessage({ text: data.message || "Invalid email or password", type: "error" });
      }
    } catch (err) {
      console.error("Login request failed:", err);
      setMessage({ text: "Unable to reach server. Please check your connection.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Arial, Helvetica, sans-serif; background: #ffffff; }
        button, input { font-family: inherit; }
        .login-page { min-height: 100vh; width: 100%; background: #ffffff; position: relative; overflow: hidden; display: flex; justify-content: center; align-items: flex-start; }
        .login-container { width: 445px; position: relative; z-index: 5; border-radius: 20px; background: #ffffff; box-shadow: 0 0 20px rgba(0, 0, 0, 0.08); padding: 38px; margin: 40px 0; }
        .gov-header { display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 35px; }
        .emblem { width: 62px; text-align: center; }
        .gov-title { color: #152d4b; }
        .gov-title p { font-size: 13px; font-weight: 600; margin-bottom: 3px; }
        .gov-title h2 { font-size: 17px; line-height: 1.25; font-weight: 700; }
        .welcome { text-align: center; margin-bottom: 30px; }
        .welcome h1 { color: #102f54; font-size: 31px; font-weight: 700; margin-bottom: 10px; }
        .welcome p { color: #8191a6; font-size: 15px; }
        .alert-box { padding: 10px 14px; border-radius: 6px; font-size: 12px; margin-bottom: 20px; text-align: center; font-weight: 600; }
        .alert-box.error { background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; }
        .alert-box.success { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }
        .form-group { margin-bottom: 23px; }
        .form-group label { display: block; color: #172b45; font-size: 15px; font-weight: 700; margin-bottom: 8px; }
        .form-group input { width: 100%; height: 51px; border: 2px solid #dce4ec; border-radius: 7px; outline: none; padding: 0 16px; color: #253b54; font-size: 14px; background: #ffffff; transition: 0.2s; }
        .form-group input:focus { border-color: #2875d3; box-shadow: 0 0 0 2px rgba(40,117,211,0.08); }
        .password-box { position: relative; }
        .password-box input { padding-right: 50px; }
        .eye-button { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); border: none; background: transparent; color: #61758c; font-size: 19px; cursor: pointer; }
        .options { display: flex; justify-content: space-between; align-items: center; margin-top: -2px; margin-bottom: 25px; }
        .remember { display: flex; align-items: center; gap: 9px; color: #40546b; font-size: 13px; font-weight: 600; cursor: pointer; }
        .remember input { display: none; }
        .checkmark { width: 22px; height: 22px; background: #1469cf; border-radius: 4px; color: white; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: bold; }
        .remember input:not(:checked) + .checkmark { background: white; border: 2px solid #c7d2de; color: transparent; }
        .options a { color: #1466c6; text-decoration: none; font-size: 13px; font-weight: 700; }
        .options a:hover { text-decoration: underline; }
        .login-button { width: 100%; height: 52px; border: none; border-radius: 6px; background: #1769d2; color: white; font-size: 17px; font-weight: 600; cursor: pointer; transition: 0.2s; }
        .login-button:disabled { background: #93c5fd; cursor: not-allowed; }
        .login-button:hover:not(:disabled) { background: #1259b5; }
        .divider { display: flex; align-items: center; gap: 12px; margin: 17px 0; }
        .divider span { height: 1px; background: #e2e8ee; flex: 1; }
        .divider p { color: #68798d; font-size: 14px; }
        .sso-button { width: 100%; height: 54px; background: white; border: 2px solid #dce4ec; border-radius: 7px; color: #142e4e; font-size: 17px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .sso-button:hover { background: #f7f9fb; border-color: #c7d3df; }
        .sso-icon { width: 21px; height: 21px; background: #193a5d; color: white; border-radius: 5px; display: flex; align-items: center; justify-content: center; font-size: 13px; }
        .authorized { text-align: center; color: #52667d; font-size: 13px; font-weight: 600; margin-top: 35px; }
        .orange-wave { position: absolute; right: -80px; bottom: 35px; width: 410px; height: 100px; border-top: 7px solid rgba(246,157,81,0.35); border-radius: 50%; transform: rotate(-12deg); pointer-events: none; }
        .green-wave { position: absolute; right: -90px; bottom: 12px; width: 420px; height: 95px; border-top: 7px solid rgba(87,184,132,0.28); border-radius: 50%; transform: rotate(-12deg); pointer-events: none; }
      `}</style>

      <div className="login-page">
        <div className="bottom-decoration">
          <div className="orange-wave"></div>
          <div className="green-wave"></div>
        </div>

        <div className="login-container">
          <div className="gov-header">
            <div className="emblem">
              <Image />
            </div>
            <div className="gov-title">
              <p>Government of India</p>
              <h2>
                Ministry of Consumer Affairs,
                <br />
                Food & Public Distribution
              </h2>
            </div>
          </div>

          <div className="welcome">
            <h1>Welcome Back</h1>
            <p>Login to access the Legal Metrology Inspection System</p>
          </div>

          {message.text && (
            <div className={`alert-box ${message.type}`}>
              {message.text}
            </div>
          )}

          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label>Official Email</label>
              <input
                type="email"
                required
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-box">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="eye-button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "◉" : "○"}
                </button>
              </div>
            </div>

            <div className="options">
              <label className="remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className="checkmark">{remember ? "✓" : ""}</span>
                <span>Remember me</span>
              </label>
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="divider">
              <span></span>
              <p>OR</p>
              <span></span>
            </div>

            <button type="button" className="sso-button">
              <span className="sso-icon">↪</span>
              Sign in with Government SSO
            </button>

            <p className="authorized">For authorized officers only.</p>
          </form>
        </div>
      </div>
    </>
  );
};

function Image() {
  return <img src={imp} alt="Government Emblem" style={{ width: "30px", height: "auto" }} />;
}

export default Login;