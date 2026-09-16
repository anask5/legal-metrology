import React from 'react';
import {Link,useNavigate} from 'react-router-dom';
import { useState } from 'react';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message,setMessage] = useState('');
    async function handleReg(e) {
        e.preventDefault()

        try {
            const response = await fetch ("http://localhost:3000/api/register" , {
                credentials: "include",
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                name,
                email,
                password,
                })
            });
            const data = await response.json();
            if (response.ok){
                setMessage(data.message);
                navigate("/createUrl")
            }
            else{
                setMessage(data.message);
            }
        }
        catch(err){
            console.log(err)
        }}
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
          background: #f4f9ff;
          color: #102d50;
        }


        button,
        input,
        select {
          font-family: inherit;
        }


        /* =====================================
           PAGE
        ===================================== */

        .page {
          min-height: 100vh;
          position: relative;

          background:
            linear-gradient(
              180deg,
              #eef7ff 0%,
              #ffffff 48%,
              #f3f9ff 100%
            );

          overflow-x: hidden;
        }


        /* =====================================
           HEADER
        ===================================== */

        .header {
          height: 78px;

          margin: 10px 12px 0;

          padding: 0 52px;

          background: rgba(255,255,255,0.92);

          border: 1px solid #d8e4f0;

          border-radius: 13px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          position: relative;
          z-index: 20;

          box-shadow:
            0 2px 8px rgba(28,70,110,0.04);
        }


        /* GOVERNMENT */

        .government {
          display: flex;
          align-items: center;
          gap: 14px;
        }


        .emblem {
          width: 60px;

          text-align: center;

          color: #122f51;
        }


        .emblem-symbol {
          width: 43px;
          height: 48px;

          margin: auto;

          border: 2px solid #16375b;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 25px;

          border-radius: 45% 45% 40% 40%;
        }


        .emblem small {
          display: block;

          font-size: 5px;

          margin-top: 1px;
        }


        .government-text {
          color: #102d50;
        }


        .government-text p {
          font-size: 14px;
          font-weight: 600;

          margin-bottom: 2px;
        }


        .government-text h2 {
          font-size: 17px;
          line-height: 1.2;
        }


        /* NAVBAR */

        .navbar {
          display: flex;
          align-items: center;
          gap: 32px;
        }


        .navbar a {
          color: #15375e;

          text-decoration: none;

          font-size: 13px;
          font-weight: 500;
        }


        .navbar a:hover {
          color: #1468d5;
        }


        .login-btn,
        .register-btn {
          height: 41px;

          padding: 0 24px;

          border-radius: 7px;

          font-size: 13px;
          font-weight: 600;

          cursor: pointer;
        }


        .login-btn {
          color: #1768d3;

          background: white;

          border: 1px solid #377cf0;
        }


        .register-btn {
          color: white;

          background: #1769d5;

          border: 1px solid #1769d5;
        }


        /* =====================================
           REGISTER CARD
        ===================================== */

        .register-card {
          width: 660px;

          margin: 28px auto 50px;

          padding: 28px 30px 30px;

          background: rgba(255,255,255,0.96);

          border: 1px solid #d5e2ee;

          border-radius: 15px;

          position: relative;
          z-index: 10;

          box-shadow:
            0 5px 25px rgba(37,84,125,0.08);
        }


        /* =====================================
           TITLE
        ===================================== */

        .title-section {
          text-align: center;

          margin-bottom: 19px;
        }


        .title-section h1 {
          font-size: 27px;

          color: #102b51;

          margin-bottom: 7px;
        }


        .title-section p {
          font-size: 14px;

          color: #536b89;
        }


        .title-line {
          width: 52px;
          height: 4px;

          background: #1a6ce0;

          border-radius: 5px;

          margin: 15px auto 0;
        }


        /* =====================================
           SECTION
        ===================================== */

        .form-section {
          margin-bottom: 19px;
        }


        .section-title {
          display: flex;
          align-items: center;

          gap: 10px;

          margin-bottom: 8px;
        }


        .section-icon {
          width: 42px;
          height: 42px;

          background: #e8f2ff;

          color: #1267d5;

          border-radius: 11px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 20px;
        }


        .section-title h2 {
          font-size: 15px;

          color: #142f54;
        }


        /* =====================================
           FORM GRID
        ===================================== */

        .form-grid {
          display: grid;

          grid-template-columns: 1fr 1fr;

          gap: 11px 18px;
        }


        .input-group {
          width: 100%;
        }


        .input-group.full {
          grid-column: 1 / -1;
        }


        .input-group label {
          display: block;

          color: #173556;

          font-size: 12px;

          font-weight: 700;

          margin-bottom: 6px;
        }


        .input-group label span {
          color: #e52c2c;
        }


        /* =====================================
           INPUT
        ===================================== */

        .input-wrapper {
          height: 43px;

          width: 100%;

          border: 1px solid #cad9e8;

          border-radius: 7px;

          background: white;

          display: flex;
          align-items: center;

          position: relative;

          transition: 0.2s;
        }


        .input-wrapper:focus-within {
          border-color: #2675dc;

          box-shadow:
            0 0 0 2px rgba(38,117,220,0.08);
        }


        .input-icon {
          width: 40px;

          text-align: center;

          color: #577292;

          font-size: 17px;
        }


        .input-wrapper input,
        .input-wrapper select {
          height: 100%;

          flex: 1;

          border: none;
          outline: none;

          background: transparent;

          color: #334f70;

          font-size: 12px;

          padding-right: 10px;
        }


        .input-wrapper input::placeholder {
          color: #8294aa;
        }


        .input-wrapper select {
          appearance: none;

          cursor: pointer;
        }


        .dropdown {
          position: absolute;

          right: 14px;

          color: #173c65;

          font-size: 18px;

          pointer-events: none;
        }


        /* =====================================
           PASSWORD
        ===================================== */

        .eye {
          border: none;

          background: transparent;

          color: #607994;

          cursor: pointer;

          font-size: 15px;

          margin-right: 12px;
        }


        .password-hint {
          display: block;

          color: #7187a1;

          font-size: 9px;

          margin-top: 5px;
        }


        /* =====================================
           AGREEMENT
        ===================================== */

        .agreement {
          display: flex;

          align-items: flex-start;

          gap: 15px;

          margin: 23px 0 22px;
        }


        .custom-checkbox {
          cursor: pointer;

          flex-shrink: 0;
        }


        .custom-checkbox input {
          display: none;
        }


        .checkbox {
          width: 22px;
          height: 22px;

          border: 2px solid #5e7896;

          border-radius: 4px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: white;

          font-size: 13px;
          font-weight: bold;
        }


        .custom-checkbox input:checked + .checkbox {
          background: #176bd5;

          border-color: #176bd5;
        }


        .agreement p {
          color: #425e7e;

          font-size: 11px;

          line-height: 1.55;
        }


        .agreement a {
          color: #1267d4;

          text-decoration: underline;

          font-weight: 600;
        }


        /* =====================================
           CREATE ACCOUNT
        ===================================== */

        .create-account {
          width: 100%;

          height: 47px;

          border: none;

          border-radius: 6px;

          background: #1769d5;

          color: white;

          font-size: 15px;

          font-weight: 700;

          cursor: pointer;

          box-shadow:
            0 3px 8px rgba(23,105,213,0.18);
        }


        .create-account:hover {
          background: #1259b8;
        }


        /* =====================================
           OR
        ===================================== */

        .or-divider {
          display: flex;

          align-items: center;

          gap: 14px;

          margin: 17px 0;
        }


        .or-divider span {
          flex: 1;

          height: 1px;

          background: #cbd9e7;
        }


        .or-divider p {
          color: #506b89;

          font-size: 11px;
        }


        /* =====================================
           SSO
        ===================================== */

        .sso {
          width: 100%;

          height: 46px;

          background: white;

          border: 1px solid #4788ec;

          border-radius: 6px;

          color: #132f54;

          font-size: 14px;

          font-weight: 700;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 10px;

          cursor: pointer;
        }


        .sso:hover {
          background: #f4f8ff;
        }


        .sso-emblem {
          font-size: 19px;

          color: #173b62;
        }


        /* =====================================
           ALREADY ACCOUNT
        ===================================== */

        .already {
          text-align: center;

          color: #4a6584;

          font-size: 12px;

          margin: 18px 0 22px;
        }


        .already a {
          color: #1268d7;

          font-weight: 700;

          text-decoration: none;
        }


        /* =====================================
           INFO BOX
        ===================================== */

        .info-box {
          min-height: 60px;

          border: 1px solid #a9cffc;

          border-radius: 7px;

          background: #edf6ff;

          display: flex;

          align-items: center;

          gap: 14px;

          padding: 10px 15px;
        }


        .info-icon {
          width: 26px;
          height: 26px;

          background: #1670dd;

          color: white;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 14px;
          font-weight: bold;

          flex-shrink: 0;
        }


        .info-box p {
          color: #173b65;

          font-size: 10px;

          margin-bottom: 5px;
        }


        .info-box strong {
          color: #142f55;

          font-size: 10px;
        }


        /* =====================================
           SIDE MESSAGES
        ===================================== */

        .left-message,
        .right-message {
          position: absolute;

          z-index: 4;

          color: #7193bf;

          font-size: 14px;

          line-height: 1.55;
        }


        .left-message {
          left: 53px;

          top: 420px;
        }


        .right-message {
          right: 52px;

          top: 420px;
        }


        .left-message div,
        .right-message div {
          width: 38px;

          height: 3px;

          background: #9dbce1;

          border-radius: 3px;

          margin-top: 15px;
        }


        /* =====================================
           BACKGROUND
        ===================================== */

        .background-decoration {
          position: absolute;

          left: 0;
          right: 0;

          top: 420px;
          bottom: 72px;

          overflow: hidden;

          pointer-events: none;

          z-index: 1;
        }


        /* WAVES */

        .orange-wave {
          position: absolute;

          width: 650px;
          height: 170px;

          right: -70px;

          top: 120px;

          border-top: 10px solid
            rgba(247,157,73,0.65);

          border-radius: 50%;

          transform: rotate(-12deg);
        }


        .green-wave {
          position: absolute;

          width: 650px;
          height: 170px;

          right: -70px;

          top: 150px;

          border-top: 10px solid
            rgba(61,177,111,0.65);

          border-radius: 50%;

          transform: rotate(-12deg);
        }


        /* =====================================
           BUILDINGS
        ===================================== */

        .building {
          position: absolute;

          bottom: 0;

          opacity: 0.28;

          border: 2px solid #91afd0;

          background: rgba(196,215,237,0.35);
        }


        .left-building {
          left: 0;

          width: 190px;
          height: 145px;

          clip-path: polygon(
            0 32%,
            15% 32%,
            15% 19%,
            29% 19%,
            29% 0,
            43% 19%,
            57% 19%,
            57% 32%,
            75% 32%,
            75% 19%,
            90% 19%,
            90% 32%,
            100% 32%,
            100% 100%,
            0 100%
          );
        }


        .middle-building {
          left: 90px;

          width: 160px;
          height: 100px;

          border-radius: 50% 50% 0 0;

          clip-path: polygon(
            50% 0,
            65% 20%,
            100% 20%,
            100% 100%,
            0 100%,
            0 20%,
            35% 20%
          );
        }


        .right-building {
          right: 15px;

          width: 185px;
          height: 150px;

          clip-path: polygon(
            0 27%,
            28% 27%,
            28% 13%,
            50% 0,
            72% 13%,
            72% 27%,
            100% 27%,
            100% 100%,
            0 100%
          );
        }


        /* =====================================
           FOOTER
        ===================================== */

        .footer {
          height: 74px;

          background: rgba(255,255,255,0.95);

          border-top: 1px solid #dbe5ef;

          display: flex;

          justify-content: space-between;

          align-items: center;

          padding: 0 85px;

          position: relative;

          z-index: 15;

          color: #486583;

          font-size: 12px;
        }


        .footer span {
          margin: 0 15px;

          color: #8aa0b8;
        }


        /* =====================================
           RESPONSIVE
        ===================================== */

        @media (max-width: 1000px) {

          .header {
            padding: 0 25px;
          }


          .navbar {
            gap: 15px;
          }


          .navbar a {
            display: none;
          }


          .register-card {
            width: 650px;
          }


          .left-message,
          .right-message {
            display: none;
          }

        }


        @media (max-width: 700px) {

          .header {
            height: 70px;

            margin: 8px;

            padding: 0 15px;
          }


          .government-text h2 {
            font-size: 11px;
          }


          .government-text p {
            font-size: 10px;
          }


          .emblem {
            width: 42px;
          }


          .emblem-symbol {
            width: 34px;
            height: 38px;

            font-size: 18px;
          }


          .login-btn {
            display: none;
          }


          .register-btn {
            padding: 0 13px;
          }


          .register-card {
            width: calc(100% - 24px);

            margin: 18px 12px 30px;

            padding: 24px 18px;
          }


          .title-section h1 {
            font-size: 23px;
          }


          .title-section p {
            font-size: 12px;
          }


          .form-grid {
            grid-template-columns: 1fr;
          }


          .input-group.full {
            grid-column: auto;
          }


          .footer {
            height: auto;

            padding: 20px;

            flex-direction: column;

            gap: 12px;

            text-align: center;
          }


          .background-decoration {
            display: none;
          }

        }


        @media (max-width: 450px) {

          .government-text h2 {
            font-size: 9px;
          }


          .government-text p {
            font-size: 8px;
          }


          .emblem {
            display: none;
          }


          .register-card {
            padding: 20px 14px;
          }


          .section-icon {
            width: 36px;
            height: 36px;

            font-size: 17px;
          }


          .section-title h2 {
            font-size: 14px;
          }


          .agreement p {
            font-size: 10px;
          }


          .info-box {
            align-items: flex-start;
          }

        }
           .wa-ge{
        height:35px;
      }
           .gaping{
        height:40px
      }

      `}</style>

     

      <p className="gaping" ></p>

      <p className="wa-ge"></p>

      <main className="register-card">

        {/* TITLE */}

        <div className="title-section">

          <h1>Create Inspector Account</h1>

          <p>
            Register to access the Legal Metrology Inspection System
          </p>

          <div className="title-line"></div>

        </div>


        {/* ================= OFFICIAL INFORMATION ================= */}

        <section className="form-section">

          <div className="section-title">

            <div className="section-icon">
              👤
            </div>

            <h2>Official Information</h2>

          </div>


          <div className="form-grid">

            {/* FULL NAME */}

            <div className="input-group">

              <label>
                Full Name <span>*</span>
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ♙
                </span>

                <input
                  type="text"
                  placeholder="Enter your full name"
                />

              </div>

            </div>


            {/* EMPLOYEE ID */}

            <div className="input-group">

              <label>
                Inspector / Employee ID <span>*</span>
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ▣
                </span>

                <input
                  type="text"
                  placeholder="Enter official ID"
                />

              </div>

            </div>


            {/* DEPARTMENT */}

            <div className="input-group full">

              <label>
                Department / Office <span>*</span>
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ♜
                </span>

                <select defaultValue="">
                  <option value="" disabled>
                    Select your department / office
                  </option>

                  <option>
                    Department of Consumer Affairs
                  </option>

                  <option>
                    Legal Metrology Department
                  </option>

                  <option>
                    Food & Public Distribution
                  </option>

                </select>

                <span className="dropdown">
                 ⌄
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* ================= CONTACT INFORMATION ================= */}

        <section className="form-section">

          <div className="section-title">

            <div className="section-icon">
              ✉
            </div>

            <h2>Contact Information</h2>

          </div>


          <div className="form-grid">

            {/* EMAIL */}

            <div className="input-group">

              <label>
                Official Email <span>*</span>
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ✉
                </span>

                <input
                  type="email"
                  placeholder="name@department.gov.in"
                />

              </div>

            </div>


            {/* PHONE */}

            <div className="input-group">

              <label>
                Contact Number <span>*</span>
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ☎
                </span>

                <input
                  type="tel"
                  placeholder="Enter contact number"
                />

              </div>

            </div>

          </div>

        </section>


        {/* ================= ACCOUNT SECURITY ================= */}

        <section className="form-section">

          <div className="section-title">

            <div className="section-icon">
              🔒
            </div>

            <h2>Account Security</h2>

          </div>


          <div className="form-grid">

            {/* PASSWORD */}

            <div className="input-group">

              <label>
                Password <span>*</span>
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔒
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                />

                <button
                  type="button"
                  className="eye"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  ◉
                </button>

              </div>

              <small className="password-hint">
                Use at least 8 characters with letters and numbers.
              </small>

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="input-group">

              <label>
                Confirm Password <span>*</span>
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔒
                </span>

                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm password"
                />

                <button
                  type="button"
                  className="eye"
                  onClick={() =>
                    setShowConfirm(!showConfirm)
                  }
                 >
                  ◉
                </button>

              </div>

            </div>

          </div>

        </section>


        {/* ================= AGREEMENT ================= */}

        <div className="agreement">

          <label className="custom-checkbox">

            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) =>
                setAgreed(e.target.checked)
              }
            />

            <span className="checkbox">
              {agreed ? "✓" : ""}
            </span>

          </label>


          <p>
            I confirm that the information provided is accurate
            and that I am authorized to access this inspection
            platform. I agree to the platform's{" "}
            <a href="#">
              terms and security requirements.
            </a>
          </p>

        </div>


        {/* ================= CREATE ACCOUNT ================= */}

        <button className="create-account">
          Create Inspector Account
        </button>


        {/* ================= OR ================= */}

        <div className="or-divider">

          <span></span>

          <p>OR</p>

          <span></span>

        </div>


        {/* ================= SSO ================= */}

        <button className="sso">

          <span className="sso-emblem">
            ✺
          </span>

          Sign in / Register with Government SSO

        </button>


        {/* ================= LOGIN LINK ================= */}

        <p className="already">

          Already have an inspector account?{" "}

          <a href="#">
            Login here
          </a>

        </p>


        {/* ================= INFO BOX ================= */}

        <div className="info-box">

          <div className="info-icon">
            ✓
          </div>

          <div>

            <p>
              Account registration is intended for authorized
              inspection personnel.
            </p>

            <strong>
              Backend verification and role approval will be
              connected later.
            </strong>

          </div>

        </div>

      </main>
    </>
  );
};

export default Register;
