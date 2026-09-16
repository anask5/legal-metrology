import React, { useEffect, useState } from "react";
import imp from "../assets/images/emblem.png";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("http://localhost:3000/api/me", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          // Adjust based on your API response structure (e.g. data.user or data)
          setUser(data.user || data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      setUser(null);
      navigate("/login");
    }
  };

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
          text-decoration: none;
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
          gap: 16px;
        }

        .navbar-link {
          color: #243b5d;
          font-size: 11px;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .navbar-link:hover {
          color: #1668df;
        }

        .navbar-login {
          padding: 9px 18px;
          border-radius: 5px;
          color: #ffffff;
          background: #1768db;
          border: 1px solid #1768db;
          font-size: 11px;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 5px 12px rgba(23, 104, 219, 0.16);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .navbar-login:hover {
          background: #0d57be;
          border-color: #0d57be;
          transform: translateY(-1px);
        }

        .navbar-signup {
          padding: 9px 18px;
          border-radius: 5px;
          color: #1768db;
          background: #ffffff;
          border: 1px solid #1768db;
          font-size: 11px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .navbar-signup:hover {
          background: #f0f7ff;
        }

        .user-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: #172b4d;
          font-weight: 600;
          background: #f1f5f9;
          padding: 6px 12px;
          border-radius: 20px;
        }

        .user-role {
          font-size: 9px;
          text-transform: uppercase;
          background: #e2e8f0;
          color: #475569;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .logout-btn {
          background: #fee2e2;
          color: #b91c1c;
          border: 1px solid #fca5a5;
          box-shadow: none;
        }

        .logout-btn:hover {
          background: #ef4444;
          color: #ffffff;
          border-color: #ef4444;
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
              <div className="navbar-government">Government of India</div>
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

            {/* If still checking session, render nothing to avoid layout flicker */}
            {loading ? null : user ? (
              <>
                <Link to="/dashboard" className="navbar-link">
                  Dashboard
                </Link>

                <div className="user-tag">
                  <span>👤 {user.name || user.email}</span>
                  {user.role && <span className="user-role">{user.role}</span>}
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="navbar-login logout-btn"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar-login">
                  Sign In
                </Link>
                <Link to="/register" className="navbar-signup">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

function Image() {
  return (
    <img
      src={imp}
      alt="Emblem of India"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default Navbar;