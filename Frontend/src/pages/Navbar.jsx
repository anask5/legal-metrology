import React from "react";
import imp from "../assets/images/emblem.png";

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <style>{`
        .navbar {
          width: 100%;
          padding: 18px 26px 0;
        }

        .navbar-box {
          max-width: 1480px;
          height: 68px;
          margin: 0 auto;
          padding: 0 26px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          background: rgba(255, 255, 255, 0.97);
          border: 1px solid #dbe5f0;
          border-radius: 10px;

          box-shadow:
            0 5px 18px rgba(34, 73, 125, 0.05),
            0 1px 2px rgba(15, 23, 42, 0.04);
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .navbar-emblem {
          width: 38px;
          height: 44px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #102c54;
          font-size: 25px;
          font-weight: 900;
        }

        .navbar-brand-copy {
          line-height: 1.05;
        }

        .navbar-government {
          color: #111827;
          font-size: 8px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .navbar-ministry {
          color: #13294b;
          font-size: 11px;
          font-weight: 800;
        }

        .navbar-department {
          margin-top: 2px;
          color: #334b70;
          font-size: 8.5px;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 23px;
        }

        .navbar-link {
          color: #243b5d;
          font-size: 11px;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .navbar-link:hover {
          color: #1668df;
        }

        .navbar-login {
          padding: 10px 23px;
          border-radius: 5px;

          color: #ffffff;
          background: #1768db;
          border: 1px solid #1768db;

          font-size: 11px;
          font-weight: 700;

          transition: all 0.2s ease;
          box-shadow: 0 5px 12px rgba(23, 104, 219, 0.16);
        }

        .navbar-login:hover {
          background: #0d57be;
          border-color: #0d57be;
          transform: translateY(-1px);
        }

        @media (max-width: 760px) {
          .navbar {
            padding: 10px 10px 0;
          }

          .navbar-box {
            padding: 0 14px;
          }

          .navbar-right {
            gap: 10px;
          }

          .navbar-link {
            display: none;
          }
        }
      `}</style>

      <header className="navbar">
        <div className="navbar-box">

          <Link to="/" className="navbar-brand">
            <div className="navbar-emblem">
              <Image />
            </div>

            <div className="navbar-brand-copy">
              <div className="navbar-government">
                Government of India
              </div>

              <div className="navbar-ministry">
                Ministry of Consumer Affairs,
              </div>

              <div className="navbar-department">
                Food & Public Distribution
              </div>
            </div>
          </Link>

          <nav className="navbar-right">
            <Link to="/" className="navbar-link">
              Home
            </Link>

            <Link to="/dashboard" className="navbar-link">
              Dashboard
            </Link>

            <Link to="/login" className="navbar-login">
              Sign In
            </Link>
            <Link to="/register" className="navbar-login">
              Sign Up
            </Link>
          </nav>

        </div>
      </header>
    </>
  );
}
function Image() {
  return (
    <img src={imp} alt="Emblem of India" style={{ width: '100%', height: '100%' }} />
  )
}
export default Navbar;
