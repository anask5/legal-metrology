import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  // Form State
  const [name, setName] = useState('');
  const [emp_id, setEmpId] = useState('');
  const [dept, setDept] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleReg(e) {
    e.preventDefault();

    if (!agreed) {
      setMessage('You must agree to the terms to continue.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          dept,
          emp_id,
        }),
      });

      // Handle non-JSON server error strings gracefully
      const contentType = response.headers.get('content-type');
      let data = {};
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = { message: await response.text() };
      }

      if (response.ok) {
        setMessage(data.message || 'Registered successfully');
        navigate('/dashboard');
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      setMessage('Network error. Check server connection.');
    }
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Arial, Helvetica, sans-serif; background: #f4f9ff; color: #102d50; }
        button, input, select { font-family: inherit; }
        .page { min-height: 100vh; position: relative; background: linear-gradient(180deg, #eef7ff 0%, #ffffff 48%, #f3f9ff 100%); overflow-x: hidden; }
        .header { height: 78px; margin: 10px 12px 0; padding: 0 52px; background: rgba(255,255,255,0.92); border: 1px solid #d8e4f0; border-radius: 13px; display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 20; box-shadow: 0 2px 8px rgba(28,70,110,0.04); }
        .government { display: flex; align-items: center; gap: 14px; }
        .emblem { width: 60px; text-align: center; color: #122f51; }
        .emblem-symbol { width: 43px; height: 48px; margin: auto; border: 2px solid #16375b; display: flex; align-items: center; justify-content: center; font-size: 25px; border-radius: 45% 45% 40% 40%; }
        .emblem small { display: block; font-size: 5px; margin-top: 1px; }
        .government-text { color: #102d50; }
        .government-text p { font-size: 14px; font-weight: 600; margin-bottom: 2px; }
        .government-text h2 { font-size: 17px; line-height: 1.2; }
        .navbar a { color: #b1a1e2; text-decoration: none; font-size: 13px; font-weight: 500; }
        .navbar a:hover { color: #1468d5; }
        .login-btn, .register-btn { height: 41px; padding: 0 24px; border-radius: 7px; font-size: 13px; font-weight: 600; cursor: pointer; }
        .login-btn { color: #1768d3; background: white; border: 1px solid #377cf0; }
        .register-btn { color: white; background: #1769d5; border: 1px solid #1769d5; }
        .register-card { width: 660px; margin: 28px auto 50px; padding: 28px 30px 30px; background: rgba(255,255,255,0.96); border: 1px solid #d5e2ee; border-radius: 15px; position: relative; z-index: 10; box-shadow: 0 5px 25px rgba(37,84,125,0.08); }
        .title-section { text-align: center; margin-bottom: 19px; }
        .title-section h1 { font-size: 27px; color: #102b51; margin-bottom: 7px; }
        .title-section p { font-size: 14px; color: #536b89; }
        .title-line { width: 52px; height: 4px; background: #1a6ce0; border-radius: 5px; margin: 15px auto 0; }
        .form-section { margin-bottom: 19px; }
        .section-title { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .section-icon { width: 42px; height: 42px; background: #e8f2ff; color: #1267d5; border-radius: 11px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
        .section-title h2 { font-size: 15px; color: #142f54; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 11px 18px; }
        .input-group { width: 100%; }
        .input-group.full { grid-column: 1 / -1; }
        .input-group label { display: block; color: #173556; font-size: 12px; font-weight: 700; margin-bottom: 6px; }
        .input-group label span { color: #e52c2c; }
        .input-wrapper { height: 43px; width: 100%; border: 1px solid #cad9e8; border-radius: 7px; background: white; display: flex; align-items: center; position: relative; transition: 0.2s; }
        .input-wrapper:focus-within { border-color: #2675dc; box-shadow: 0 0 0 2px rgba(38,117,220,0.08); }
        .input-icon { width: 40px; text-align: center; color: #577292; font-size: 17px; }
        .input-wrapper input, .input-wrapper select { height: 100%; flex: 1; border: none; outline: none; background: transparent; color: #334f70; font-size: 12px; padding-right: 10px; }
        .input-wrapper input::placeholder { color: #8294aa; }
        .input-wrapper select { appearance: none; cursor: pointer; }
        .dropdown { position: absolute; right: 14px; color: #173c65; font-size: 18px; pointer-events: none; }
        .eye { border: none; background: transparent; color: #607994; cursor: pointer; font-size: 15px; margin-right: 12px; }
        .password-hint { display: block; color: #7187a1; font-size: 9px; margin-top: 5px; }
        .agreement { display: flex; align-items: flex-start; gap: 15px; margin: 23px 0 22px; }
        .custom-checkbox { cursor: pointer; flex-shrink: 0; }
        .custom-checkbox input { display: none; }
        .checkbox { width: 22px; height: 22px; border: 2px solid #5e7896; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 13px; font-weight: bold; }
        .custom-checkbox input:checked + .checkbox { background: #176bd5; border-color: #176bd5; }
        .agreement p { color: #425e7e; font-size: 11px; line-height: 1.55; }
        .agreement a { color: #1267d4; text-decoration: underline; font-weight: 600; }
        .create-account { width: 100%; height: 47px; border: none; border-radius: 6px; background: #1769d5; color: white; font-size: 15px; font-weight: 700; cursor: pointer; box-shadow: 0 3px 8px rgba(23,105,213,0.18); }
        .create-account:hover { background: #1259b8; }
        .or-divider { display: flex; align-items: center; gap: 14px; margin: 17px 0; }
        .or-divider span { flex: 1; height: 1px; background: #cbd9e7; }
        .or-divider p { color: #506b89; font-size: 11px; }
        .sso { width: 100%; height: 46px; background: white; border: 1px solid #4788ec; border-radius: 6px; color: #132f54; font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 10px; cursor: pointer; }
        .sso:hover { background: #f4f8ff; }
        .sso-emblem { font-size: 19px; color: #173b62; }
        .already { text-align: center; color: #4a6584; font-size: 12px; margin: 18px 0 22px; }
        .already a { color: #1268d7; font-weight: 700; text-decoration: none; }
        .info-box { min-height: 60px; border: 1px solid #a9cffc; border-radius: 7px; background: #edf6ff; display: flex; align-items: center; gap: 14px; padding: 10px 15px; }
        .info-icon { width: 26px; height: 26px; background: #1670dd; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; flex-shrink: 0; }
        .info-box p { color: #173b65; font-size: 10px; margin-bottom: 5px; }
        .info-box strong { color: #142f55; font-size: 10px; }
        .alert-banner { padding: 10px; margin-bottom: 15px; border-radius: 6px; font-size: 12px; background: #fee2e2; color: #991b1b; text-align: center; }
      `}</style>

      <main className="register-card">
        <div className="title-section">
          <h1>Create Inspector Account</h1>
          <p>Register to access the Legal Metrology Inspection System</p>
          <div className="title-line"></div>
        </div>

        {message && <div className="alert-banner">{message}</div>}

        <form onSubmit={handleReg}>
          {/* OFFICIAL INFORMATION */}
          <section className="form-section">
            <div className="section-title">
              <div className="section-icon">👤</div>
              <h2>Official Information</h2>
            </div>

            <div className="form-grid">
              <div className="input-group">
                <label>Full Name <span>*</span></label>
                <div className="input-wrapper">
                  <span className="input-icon">♙</span>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Inspector / Employee ID <span>*</span></label>
                <div className="input-wrapper">
                  <span className="input-icon">▣</span>
                  <input
                    type="text"
                    required
                    placeholder="Enter official ID"
                    value={emp_id}
                    onChange={(e) => setEmpId(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-group full">
                <label>Department / Office <span>*</span></label>
                <div className="input-wrapper">
                  <span className="input-icon">♜</span>
                  <select
                    required
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                  >
                    <option value="" disabled>Select your department / office</option>
                    <option value="Department of Consumer Affairs">Department of Consumer Affairs</option>
                    <option value="Legal Metrology Department">Legal Metrology Department</option>
                    <option value="Food & Public Distribution">Food & Public Distribution</option>
                  </select>
                  <span className="dropdown">⌄</span>
                </div>
              </div>
            </div>
          </section>

          {/* CONTACT INFORMATION */}
          <section className="form-section">
            <div className="section-title">
              <div className="section-icon">✉</div>
              <h2>Contact Information</h2>
            </div>

            <div className="form-grid">
              <div className="input-group">
                <label>Official Email <span>*</span></label>
                <div className="input-wrapper">
                  <span className="input-icon">✉</span>
                  <input
                    type="email"
                    required
                    placeholder="name@department.gov.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Contact Number <span>*</span></label>
                <div className="input-wrapper">
                  <span className="input-icon">☎</span>
                  <input
                    type="tel"
                    placeholder="Enter contact number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ACCOUNT SECURITY */}
          <section className="form-section">
            <div className="section-title">
              <div className="section-icon">🔒</div>
              <h2>Account Security</h2>
            </div>

            <div className="form-grid">
              <div className="input-group">
                <label>Password <span>*</span></label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="eye"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    ◉
                  </button>
                </div>
                <small className="password-hint">
                  Use at least 8 characters with letters and numbers.
                </small>
              </div>

              <div className="input-group">
                <label>Confirm Password <span>*</span></label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    required
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="eye"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    ◉
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* AGREEMENT */}
          <div className="agreement">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span className="checkbox">{agreed ? '✓' : ''}</span>
            </label>
            <p>
              I confirm that the information provided is accurate and that I am authorized
              to access this inspection platform. I agree to the platform's{' '}
              <a href="#">terms and security requirements.</a>
            </p>
          </div>

          <button type="submit" className="create-account">
            Create Inspector Account
          </button>
        </form>

        <div className="or-divider">
          <span></span>
          <p>OR</p>
          <span></span>
        </div>

        <button type="button" className="sso">
          <span className="sso-emblem">✺</span>
          Sign in / Register with Government SSO
        </button>

        <p className="already">
          Already have an inspector account? <Link to="/login">Login here</Link>
        </p>

        <div className="info-box">
          <div className="info-icon">✓</div>
          <div>
            <p>Account registration is intended for authorized inspection personnel.</p>
            <strong>Backend verification and role approval will be connected later.</strong>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;