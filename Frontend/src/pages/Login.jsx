import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import imp from "/public/ashok_symbol.jpg";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3002/api/shorten", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application.json"
        },
        body: JSON.stringify({
          email, password
        })
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        navigate("/createUrl")
      }
      else {
        setMessage(data.message)
      }
    }
    catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <>
      <style>{`
    
         * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: Arial, Helvetica, sans-serif;
          background: #ffffff;
        }

        button,
        input {
          font-family: inherit;
        }

        .login-page {
          min-height: 100vh;
          width: 100%;
          background: #ffffff;
          position: relative;
          overflow: hidden;

          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .login-container {
          width: 445px;
          position: relative;
          z-index: 5;
          border-radius: 20px;
          background: #ffffff;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
          padding: 38px;
        }

        .gov-header {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 15px;
          margin-bottom: 35px;
        }

        .emblem {
          width: 62px;
          text-align: center;
        }

        .emblem-circle {
          width: 53px;
          height: 53px;

          margin: auto;

          border: 3px solid #162e4c;
          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 27px;
          color: #162e4c;
          font-weight: bold;
        }

        .emblem-text {
          font-size: 7px;
          color: #162e4c;
          margin-top: 2px;
        }

        .gov-title {
          color: #152d4b;
        }

        .gov-title p {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 3px;
        }

        .gov-title h2 {
          font-size: 17px;
          line-height: 1.25;
          font-weight: 700;
        }

        .welcome {
          text-align: center;
          margin-bottom: 40px;
        }

        .welcome h1 {
          color: #102f54;
          font-size: 31px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .welcome p {
          color: #8191a6;
          font-size: 15px;
        }

        .login-form {
          width: 100%;
        }

        .form-group {
          margin-bottom: 23px;
        }

        .form-group label {
          display: block;
          color: #172b45;
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .form-group input {
          width: 100%;
          height: 51px;
          border: 2px solid #dce4ec;
          border-radius: 7px;
          outline: none;
          padding: 0 16px;
          color: #253b54;
          font-size: 14px;
          background: #ffffff;
          transition: 0.2s;
        }

        .form-group input::placeholder {
          color: #a6b2c0;
        }

        .form-group input:focus {
          border-color: #2875d3;
          box-shadow: 0 0 0 2px rgba(40,117,211,0.08);
        }

        .password-box {
          position: relative;
        }

        .password-box input {
          padding-right: 50px;
        }

        .eye-button {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          border: none;
          background: transparent;
          color: #61758c;
          font-size: 19px;
          cursor: pointer;
        }

        .options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: -2px;
          margin-bottom: 25px;
        }

        .remember {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #40546b;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          position: relative;
        }

        .remember input {
          display: none;
        }

        .checkmark {
          width: 22px;
          height: 22px;
          background: #1469cf;
          border-radius: 4px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: bold;
        }

        .remember input:not(:checked) + .checkmark {
          background: white;
          border: 2px solid #c7d2de;
          color: transparent;
        }

        .options a {
          color: #1466c6;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
        }

        .options a:hover {
          text-decoration: underline;
        }

        .login-button {
          width: 100%;
          height: 52px;
          border: none;
          border-radius: 6px;
          background: #1769d2;
          color: white;
          font-size: 17px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }

        .login-button:hover {
          background: #1259b5;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 17px 0;
        }

        .divider span {
          height: 1px;
          background: #e2e8ee;
          flex: 1;
        }

        .divider p {
          color: #68798d;
          font-size: 14px;
        }

        .sso-button {
          width: 100%;
          height: 54px;
          background: white;
          border: 2px solid #dce4ec;
          border-radius: 7px;
          color: #142e4e;
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: 0.2s;
        }

        .sso-button:hover {
          background: #f7f9fb;
          border-color: #c7d3df;
        }

        .sso-icon {
          width: 21px;
          height: 21px;
          background: #193a5d;
          color: white;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
        }

        .authorized {
          text-align: center;
          color: #52667d;
          font-size: 13px;
          font-weight: 600;
          margin-top: 35px;
        }

        .orange-wave {
          position: absolute;
          right: -80px;
          bottom: 35px;
          width: 410px;
          height: 100px;
          border-top: 7px solid rgba(246,157,81,0.35);
          border-radius: 50%;
          transform: rotate(-12deg);
        }

        .green-wave {
          position: absolute;
          right: -90px;
          bottom: 12px;
          width: 420px;
          height: 95px;
          border-top: 7px solid rgba(87,184,132,0.28);
          border-radius: 50%;
          transform: rotate(-12deg);
        }

        @media (max-width: 600px) {

          .login-container {
            width: 90%;
            padding-top: 25px;
          }

          .gov-header {
            gap: 10px;
            margin-bottom: 28px;
          }

          .emblem {
            width: 48px;
          }

          .emblem-circle {
            width: 44px;
            height: 44px;
            font-size: 21px;
          }

          .gov-title p {
            font-size: 11px;
          }

          .gov-title h2 {
            font-size: 14px;
          }

          .welcome {
            margin-bottom: 30px;
          }

          .welcome h1 {
            font-size: 27px;
          }

          .welcome p {
            font-size: 12px;
          }

          .form-group label {
            font-size: 14px;
          }

          .login-button,
          .sso-button {
            font-size: 15px;
          }

          .bottom-decoration {
            height: 120px;
          }

        }

        @media (max-width: 400px) {

          .gov-title h2 {
            font-size: 12px;
          }

          .gov-title p {
            font-size: 10px;
          }

          .options {
            font-size: 11px;
          }

          .options a {
            font-size: 11px;
          }

        }
        .wage{
            height:100px;
            }
            .wa-ge{
            height:100px;
            }

            `}
      </style>

      <div className='wa-ge'></div>
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

            <p>
              Login to access the Legal Metrology Inspection System
            </p>

          </div>

          <form className="login-form">

            <div className="form-group">

              <label>
                Email / User ID
              </label>

              <input
                type="text"
                placeholder="Enter your email or user ID"
              />

            </div>

            <div className="form-group">

              <label>
                Password
              </label>

              <div className="password-box">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                />

                <button
                  type="button"
                  className="eye-button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "◉" : "◉"}
                </button>

              </div>

            </div>


            {/* REMEMBER + FORGOT */}
            <div className="options">

              <label className="remember">

                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />

                <span className="checkmark">✓</span>

                <span>Remember me</span>

              </label>


              <a href="#">
                Forgot password?
              </a>

            </div>


            {/* LOGIN */}
            <button
              type="submit"
              className="login-button"
            >
              Login
            </button>


            {/* OR */}
            <div className="divider">

              <span></span>

              <p>OR</p>

              <span></span>

            </div>


            {/* SSO */}
            <button
              type="button"
              className="sso-button"
            >

              <span className="sso-icon">
                ↪
              </span>

              Sign in with Government SSO

            </button>


            {/* FOOTER TEXT */}
            <p className="authorized">
              For authorized officers only.
            </p>

          </form>

        </div>

      </div>
    </>
  );
};
function Image() {
  return (
    <img src={imp} alt="ashok" style={{ width: '70px', height: '100%' }} />
  )
}
export default Login;
