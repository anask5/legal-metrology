import React from "react";
import { NavLink, Link } from "react-router-dom";

import imp from "../assets/images/emblem.png";

function Sidebar() {
  const menuItems = [
    {name:"Home",path:"/home",icon:"⌂"},
    
    { name: "New Scan", path: "/scan_prod", icon: "⌕" },
    { name: "Scan History", path: "/history", icon: "◷" },
    
  ];

  return (
    <>
      <style>{`
        .sidebar {
          position: fixed;
          inset: 0 auto 0 0;
          z-index: 100;

          width: 230px;
          height: 100vh;

          display: flex;
          flex-direction: column;

          background:
            linear-gradient(
              180deg,
              #0f74d8 0%,
              #030a12 100%
            );

          border-right: 1px solid rgba(239, 215, 215, 0.05);

          color: white;
        }

        .sidebar a {
          text-decoration: none;
        }

        .sidebar-brand {
          height: 78px;

          padding: 0 20px;

          display: flex;
          align-items: center;
          gap: 11px;

          color: white;

          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .sidebar-logo {
          width: 37px;
          height: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #ffffff;
          font-size: 23px;
        }

        .sidebar-brand-title {
          color: #ffffff;

          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.1px;
        }

        .sidebar-brand-subtitle {
          margin-top: 3px;
          color: #8195ae;
          font-size: 7px;
        }

        .sidebar-menu {
          flex: 1;
          padding: 20px 11px;
        }

        .sidebar-section {
          margin: 0 9px 10px;

          color: #637993;
          font-size: 7px;
          font-weight: 800;

          letter-spacing: 1.2px;
          text-transform: uppercase;
        }

        .sidebar-link {
          position: relative;

          width: 100%;
          min-height: 43px;

          margin-bottom: 5px;
          padding: 0 13px;

          display: flex;
          align-items: center;
          gap: 11px;

          border-radius: 8px;

          color: #b8c6d6;

          font-size: 10px;
          font-weight: 600;

          transition:
            color 0.2s ease,
            background 0.2s ease;
        }

        .sidebar-link:hover {
          color: #ffffff;
          background: rgba(255,255,255,0.06);
        }

        .sidebar-link.active {
          color: #ffffff;
          background:
            linear-gradient(
              135deg,
              #1f73e7,
              #1661cf
            );

          box-shadow:
            0 8px 18px rgba(23,104,219,0.2);
        }

        .sidebar-link.active::before {
          content: "";

          position: absolute;
          left: 0;
          top: 8px;
          bottom: 8px;

          width: 3px;

          border-radius: 0 3px 3px 0;

          background: #ffffff;
        }

        .sidebar-icon {
          width: 18px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: inherit;

          font-size: 13px;
        }

        .sidebar-user-area {
          padding: 16px 13px;

          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .sidebar-user {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .sidebar-avatar {
          width: 34px;
          height: 34px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: #e7f0fc;
          color: #193d69;

          font-size: 9px;
          font-weight: 800;
        }

        .sidebar-user-name {
          color: #ffffff;
          font-size: 9px;
          font-weight: 700;
        }

        .sidebar-user-id {
          margin-top: 3px;
          color: #8094ad;
          font-size: 7px;
        }

        .sidebar-logout {
          display: block;
          margin-top: 14px;

          color: #8193aa;

          font-size: 8px;
        }

        .sidebar-logout:hover {
          color: #ffffff;
        }

        @media (max-width: 850px) {
          .sidebar {
            width: 70px;
          }

          .sidebar-brand {
            justify-content: center;
            padding: 0;
          }

          .sidebar-brand-copy,
          .sidebar-link-text,
          .sidebar-user-copy {
            display: none;
          }

          .sidebar-link {
            justify-content: center;
            padding: 0;
          }

          .sidebar-user {
            justify-content: center;
          }

          .sidebar-logout {
            text-align: center;
          }
        }
      `}</style>

      <aside className="sidebar">

        <Link
          to="/dashboard"
          className="sidebar-brand"
        >
          <div className="sidebar-logo">
            <Image />
          </div>

          <div className="sidebar-brand-copy">

            <div className="sidebar-brand-title">
              Legal Metrology
            </div>

            <div className="sidebar-brand-subtitle">
              AI Inspection System
            </div>

          </div>
        </Link>

        <nav className="sidebar-menu">

          <div className="sidebar-section">
            Inspection
          </div>

          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <span className="sidebar-icon">
                {item.icon}
              </span>

              <span className="sidebar-link-text">
                {item.name}
              </span>
            </NavLink>
          ))}

        </nav>

        <div className="sidebar-user-area">

          <div className="sidebar-user">

            <div className="sidebar-avatar">
              IN
            </div>

            <div className="sidebar-user-copy">

              <div className="sidebar-user-name">
                Inspector
              </div>

              <div className="sidebar-user-id">
                INS001
              </div>

            </div>

          </div>

          <Link
            to="/"
            className="sidebar-logout"
          >
            ↪ Logout
          </Link>

        </div>

      </aside>
    </>
  );
}
function Image() {
  return (
    <img src={imp} alt="Emblem of India" style={{ width: '100%', height: '100%' }} />
  )
}
export default Sidebar;