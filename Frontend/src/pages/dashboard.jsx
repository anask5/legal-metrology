import React from "react";
import { Link } from "react-router-dom";

import home from "./home.jsx";
import Sidebar from "./sidebar.jsx";

function Dashboard() {
  const stats = [
    {
      title: "Products Scanned",
      value: "128",
      change: "+12%",
      note: "vs last week",
      icon: "◫",
      className: "blue",
    },
    {
      title: "Compliant",
      value: "92",
      change: "72%",
      note: "of total",
      icon: "✓",
      className: "green",
    },
    {
      title: "Potential Violations",
      value: "28",
      change: "22%",
      note: "of total",
      icon: "!",
      className: "orange",
    },
    {
      title: "Pending Review",
      value: "8",
      change: "6%",
      note: "of total",
      icon: "◷",
      className: "purple",
    },
  ];

  const inspections = [
    {
      id: "INS-20250902-001",
      product: "ABC Shampoo",
      category: "Personal Care",
      date: "2 Sep 2025",
      status: "Potential Violation",
      type: "danger",
    },
    {
      id: "INS-20250902-002",
      product: "Fresh Bites Chips",
      category: "Food",
      date: "2 Sep 2025",
      status: "Compliant",
      type: "success",
    },
    {
      id: "INS-20250902-003",
      product: "Glow Face Wash",
      category: "Cosmetics",
      date: "1 Sep 2025",
      status: "Pending",
      type: "pending",
    },
    {
      id: "INS-20250902-014",
      product: "Premium Rice",
      category: "Food",
      date: "1 Sep 2025",
      status: "Compliant",
      type: "success",
    },
    {
      id: "INS-20250831-009",
      product: "Energy Drink",
      category: "Beverage",
      date: "31 Aug 2025",
      status: "Potential Violation",
      type: "danger",
    },
  ];

  const activity = [
    {
      icon: "✓",
      title: "Inspection marked compliant",
      description:
        "INS-20250902-002 · Fresh Bites Chips",
      time: "12 minutes ago",
      color: "green",
    },
    {
      icon: "!",
      title: "Potential violation detected",
      description:
        "ABC Shampoo requires inspector review",
      time: "35 minutes ago",
      color: "orange",
    },
    {
      icon: "+",
      title: "New inspection created",
      description:
        "INS-20250902-003 · Glow Face Wash",
      time: "1 hour ago",
      color: "blue",
    },
  ];

  const chartData = [
    { day: "26", scanned: 18, compliant: 10, violations: 3 },
    { day: "27", scanned: 22, compliant: 12, violations: 4 },
    { day: "28", scanned: 24, compliant: 15, violations: 5 },
    { day: "29", scanned: 27, compliant: 17, violations: 3 },
    { day: "30", scanned: 31, compliant: 21, violations: 4 },
    { day: "31", scanned: 25, compliant: 15, violations: 5 },
    { day: "1", scanned: 29, compliant: 20, violations: 4 },
    { day: "2", scanned: 37, compliant: 27, violations: 3 },
  ];

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family:
            Inter,
            Arial,
            Helvetica,
            sans-serif;
          background: #f5f8fc;
          color: #122a49;
        }

        .dashboard-page,
        .dashboard-page * {
          box-sizing: border-box;
        }

        .dashboard-page a {
          text-decoration: none;
        }

        .dashboard-page {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 80% 0%,
              rgba(32, 110, 220, 0.04),
              transparent 24%
            ),
            #f5f8fc;
        }

       

        .dashboard-content {
          margin-left: 230px;
          min-height: 100vh;
        }


        .dashboard-header {
          position: sticky;
          top: 0;
          z-index: 40;

          min-height: 78px;
          padding: 0 30px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          background: rgba(255,255,255,0.94);
          backdrop-filter: blur(12px);

          border-bottom: 1px solid #e4eaf1;
        }

        .header-title h1 {
          margin: 0;
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.4px;
          color: #0d2748;
        }

        .header-title p {
          margin: 5px 0 0;
          color: #788ba4;
          font-size: 10px;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .header-date {
          padding-right: 15px;
          border-right: 1px solid #e3e9f0;

          color: #7b8ca2;
          font-size: 10px;
        }

        .profile {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .profile-avatar {
          width: 34px;
          height: 34px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background:
            linear-gradient(
              135deg,
              #e8f1ff,
              #d5e7ff
            );

          color: #1768db;

          font-size: 10px;
          font-weight: 800;
        }

        .profile-name {
          color: #203c5d;
          font-size: 10px;
          font-weight: 700;
        }

        .profile-role {
          margin-top: 2px;
          color: #8a99ab;
          font-size: 8px;
        }

        .new-scan {
          display: inline-flex;
          align-items: center;
          gap: 7px;

          padding: 11px 16px;

          border-radius: 8px;

          background:
            linear-gradient(
              135deg,
              #1d72eb,
              #1358ca
            );

          color: white;

          font-size: 10px;
          font-weight: 800;

          box-shadow:
            0 7px 18px rgba(21, 94, 219, 0.20);

          transition: all 0.2s ease;
        }

        .new-scan:hover {
          transform: translateY(-1px);
          box-shadow:
            0 10px 22px rgba(21, 94, 219, 0.25);
        }

       

        .dashboard-main {
          padding: 26px 30px 35px;
        }


        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 17px;
        }

        .stat-card {
          position: relative;

          min-height: 135px;
          padding: 18px;

          overflow: hidden;

          border: 1px solid #e1e8f0;
          border-radius: 14px;

          background: #ffffff;

          box-shadow:
            0 3px 12px rgba(24, 52, 84, 0.03);

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);

          box-shadow:
            0 12px 28px rgba(24, 52, 84, 0.07);
        }

        .stat-card::after {
          content: "";

          position: absolute;

          right: -28px;
          bottom: -35px;

          width: 105px;
          height: 105px;

          border-radius: 50%;

          opacity: 0.5;
        }

        .stat-blue::after {
          background: #eaf3ff;
        }

        .stat-green::after {
          background: #e9faf3;
        }

        .stat-orange::after {
          background: #fff4df;
        }

        .stat-purple::after {
          background: #f3eaff;
        }

        .stat-top {
          position: relative;
          z-index: 2;

          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .stat-title {
          color: #70829a;
          font-size: 10px;
          font-weight: 600;
        }

        .stat-value {
          margin-top: 7px;

          color: #102b4d;

          font-size: 29px;
          line-height: 1;

          font-weight: 850;
          letter-spacing: -1px;
        }

        .stat-icon {
          width: 36px;
          height: 36px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 10px;

          font-size: 14px;
          font-weight: 900;
        }

        .stat-blue .stat-icon {
          background: #eaf3ff;
          color: #206fe0;
        }

        .stat-green .stat-icon {
          background: #e8faf1;
          color: #18a36b;
        }

        .stat-orange .stat-icon {
          background: #fff4df;
          color: #e48a13;
        }

        .stat-purple .stat-icon {
          background: #f3eaff;
          color: #8d4adf;
        }

        .stat-bottom {
          position: relative;
          z-index: 2;

          margin-top: 13px;

          display: flex;
          align-items: center;
          gap: 6px;

          font-size: 9px;
        }

        .change-green {
          color: #17a369;
          font-weight: 800;
        }

        .change-orange {
          color: #dd8b1b;
          font-weight: 800;
        }

        .change-purple {
          color: #8b47d8;
          font-weight: 800;
        }

        .change-note {
          color: #8695a7;
        }

       

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 17px;
          margin-top: 18px;
        }

        .panel {
          padding: 19px;

          border: 1px solid #e1e8f0;
          border-radius: 14px;

          background: #ffffff;

          box-shadow:
            0 3px 12px rgba(24, 52, 84, 0.025);
        }

        .panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;

          margin-bottom: 18px;
        }

        .panel-title {
          color: #183756;
          font-size: 13px;
          font-weight: 800;
        }

        .panel-subtitle {
          margin-top: 4px;
          color: #8392a5;
          font-size: 8px;
        }

        .view-link {
          color: #1768db;
          font-size: 8px;
          font-weight: 800;
        }

      

        .chart-header-right {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .legend {
          display: flex;
          gap: 11px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 5px;

          color: #77879b;
          font-size: 8px;
        }

        .legend-color {
          width: 8px;
          height: 8px;

          border-radius: 2px;
        }

        .legend-scanned {
          background: #4288ed;
        }

        .legend-compliant {
          background: #39b57e;
        }

        .legend-violations {
          background: #ef7777;
        }

        .chart {
          position: relative;
          height: 270px;
        }

        .chart-grid {
          position: absolute;
          left: 38px;
          right: 10px;
          top: 5px;
          bottom: 35px;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .grid-line {
          width: 100%;
          border-top: 1px dashed #e8edf3;
        }

        .chart-y-labels {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 35px;

          display: flex;
          flex-direction: column;
          justify-content: space-between;

          color: #92a0af;
          font-size: 8px;
        }

        .bars {
          position: absolute;

          left: 50px;
          right: 10px;
          top: 10px;
          bottom: 35px;

          display: grid;
          grid-template-columns: repeat(8, 1fr);
          align-items: end;
          gap: 12px;
        }

        .bar-group {
          height: 100%;

          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 3px;
        }

        .bar {
          width: 8px;

          border-radius: 4px 4px 1px 1px;

          transition:
            opacity 0.2s ease,
            transform 0.2s ease;
        }

        .bar:hover {
          opacity: 0.8;
          transform: translateY(-2px);
        }

        .bar.scanned {
          background:
            linear-gradient(
              180deg,
              #61a2ff,
              #3f82df
            );
        }

        .bar.compliant {
          background:
            linear-gradient(
              180deg,
              #55ca93,
              #2eaa72
            );
        }

        .bar.violation {
          background:
            linear-gradient(
              180deg,
              #f58b8b,
              #e76161
            );
        }

        .chart-labels {
          position: absolute;

          left: 50px;
          right: 10px;
          bottom: 4px;

          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 12px;

          color: #8998aa;
          font-size: 7px;
          text-align: center;
        }

        

        .inspection-table {
          width: 100%;
          border-collapse: collapse;
        }

        .inspection-table th {
          padding: 10px 8px;

          color: #8b9aac;

          border-bottom: 1px solid #edf1f5;

          font-size: 7px;
          font-weight: 700;

          text-align: left;
        }

        .inspection-table td {
          padding: 13px 8px;

          border-bottom: 1px solid #f0f3f7;

          color: #53677f;
          font-size: 8px;
        }

        .inspection-table tr:last-child td {
          border-bottom: none;
        }

        .inspection-table td.product {
          color: #183858;
          font-weight: 750;
        }

        .inspection-table td.id {
          color: #74879f;
          font-size: 7px;
        }

        .status {
          display: inline-flex;
          align-items: center;

          padding: 5px 8px;

          border-radius: 999px;

          font-size: 7px;
          font-weight: 800;
        }

        .status-success {
          color: #128b5e;
          background: #eaf9f2;
        }

        .status-danger {
          color: #db5b5a;
          background: #fff0ef;
        }

        .status-pending {
          color: #647990;
          background: #eef3f8;
        }

       

        .bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 17px;
          margin-top: 18px;
        }

        /* Quick actions */

        .quick-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .quick-card {
          display: block;

          min-height: 92px;

          padding: 15px;

          border: 1px solid #e4eaf1;
          border-radius: 11px;

          background:
            linear-gradient(
              180deg,
              #fbfdff,
              #f7faff
            );

          transition:
            transform 0.2s ease,
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .quick-card:hover {
          transform: translateY(-2px);

          border-color: #b6cff0;

          box-shadow:
            0 10px 24px rgba(24, 61, 102, 0.06);
        }

        .quick-icon {
          width: 30px;
          height: 30px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 8px;

          background: #edf5ff;
          color: #1768db;

          font-size: 13px;
          font-weight: 900;
        }

        .quick-title {
          margin-top: 11px;

          color: #1b3858;
          font-size: 9px;
          font-weight: 800;
        }

        .quick-description {
          margin-top: 4px;

          color: #7d8da0;
          font-size: 7px;
          line-height: 1.45;
        }


        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 11px;
        }

        .activity-icon {
          width: 31px;
          height: 31px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex: 0 0 auto;

          border-radius: 50%;

          font-size: 11px;
          font-weight: 900;
        }

        .activity-green {
          color: #168e60;
          background: #eaf9f1;
        }

        .activity-orange {
          color: #d9891c;
          background: #fff3dd;
        }

        .activity-blue {
          color: #1768db;
          background: #edf5ff;
        }

        .activity-title {
          color: #294563;
          font-size: 9px;
          font-weight: 700;
        }

        .activity-description {
          margin-top: 3px;
          color: #7a8ca3;
          font-size: 8px;
        }

        .activity-time {
          margin-top: 4px;
          color: #a0adbb;
          font-size: 7px;
        }

       

        @media (max-width: 1180px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .dashboard-grid,
          .bottom-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 850px) {
          .dashboard-content {
            margin-left: 70px;
          }

          .dashboard-header {
            padding: 0 18px;
          }

          .dashboard-main {
            padding: 20px 18px 30px;
          }

          .header-date {
            display: none;
          }
        }

        @media (max-width: 620px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .quick-actions {
            grid-template-columns: 1fr;
          }

          .profile {
            display: none;
          }

          .dashboard-header {
            min-height: 70px;
          }

          .header-title h1 {
            font-size: 17px;
          }

          .new-scan {
            padding: 9px 12px;
          }

          .inspection-table th:nth-child(3),
          .inspection-table td:nth-child(3) {
            display: none;
          }
        }
      `}</style>

      <div className="dashboard-page">

        <Sidebar />

        <main className="dashboard-content">

         

          <header className="dashboard-header">

            <div className="header-title">
              <h1>Dashboard</h1>
              <p>
                Overview of Legal Metrology inspection activities
              </p>
            </div>

            <div className="header-right">

              <div className="header-date">
                Tuesday, 2 September 2025
              </div>

              <div className="profile">
                <div className="profile-avatar">
                  IN
                </div>

                <div>
                  <div className="profile-name">
                    Inspector
                  </div>

                  <div className="profile-role">
                    INS001
                  </div>
                </div>
              </div>

              <Link
                to="/scan"
                className="new-scan"
              >
                <span>+</span>
                New Scan
              </Link>

            </div>

          </header>

          

          <div className="dashboard-main">

            {/* STATS */}

            <section className="stats-grid">

              {stats.map((stat) => (
                <div
                  key={stat.title}
                  className={`stat-card stat-${stat.className}`}
                >

                  <div className="stat-top">

                    <div>
                      <div className="stat-title">
                        {stat.title}
                      </div>

                      <div className="stat-value">
                        {stat.value}
                      </div>
                    </div>

                    <div className="stat-icon">
                      {stat.icon}
                    </div>

                  </div>

                  <div className="stat-bottom">

                    <span
                      className={
                        stat.className === "green"
                          ? "change-green"
                          : stat.className === "orange"
                          ? "change-orange"
                          : stat.className === "purple"
                          ? "change-purple"
                          : "change-green"
                      }
                    >
                      {stat.change}
                    </span>

                    <span className="change-note">
                      {stat.note}
                    </span>

                  </div>

                </div>
              ))}

            </section>

            {/* CHART + TABLE */}

            <section className="dashboard-grid">

              {/* CHART */}

              <div className="panel">

                <div className="panel-header">

                  <div>
                    <div className="panel-title">
                      Inspection Trends
                    </div>

                    <div className="panel-subtitle">
                      Last 8 inspection days
                    </div>
                  </div>

                  <div className="legend">

                    <div className="legend-item">
                      <span className="legend-color legend-scanned" />
                      Scanned
                    </div>

                    <div className="legend-item">
                      <span className="legend-color legend-compliant" />
                      Compliant
                    </div>

                    <div className="legend-item">
                      <span className="legend-color legend-violations" />
                      Violations
                    </div>

                  </div>

                </div>

                <div className="chart">

                  <div className="chart-grid">
                    <div className="grid-line" />
                    <div className="grid-line" />
                    <div className="grid-line" />
                    <div className="grid-line" />
                    <div className="grid-line" />
                  </div>

                  <div className="chart-y-labels">
                    <span>40</span>
                    <span>30</span>
                    <span>20</span>
                    <span>10</span>
                    <span>0</span>
                  </div>

                  <div className="bars">

                    {chartData.map((item) => (
                      <div
                        key={item.day}
                        className="bar-group"
                      >

                        <div
                          className="bar scanned"
                          style={{
                            height: `${(item.scanned / 40) * 100}%`,
                          }}
                        />

                        <div
                          className="bar compliant"
                          style={{
                            height: `${(item.compliant / 40) * 100}%`,
                          }}
                        />

                        <div
                          className="bar violation"
                          style={{
                            height: `${(item.violations / 40) * 100}%`,
                          }}
                        />

                      </div>
                    ))}

                  </div>

                  <div className="chart-labels">

                    {chartData.map((item) => (
                      <span key={item.day}>
                        {item.day} Sep
                      </span>
                    ))}

                  </div>

                </div>

              </div>

              {/* RECENT INSPECTIONS */}

              <div className="panel">

                <div className="panel-header">

                  <div>
                    <div className="panel-title">
                      Recent Inspections
                    </div>

                    <div className="panel-subtitle">
                      Latest inspection activity
                    </div>
                  </div>

                  <Link
                    to="/history"
                    className="view-link"
                  >
                    View All →
                  </Link>

                </div>

                <table className="inspection-table">

                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>PRODUCT</th>
                      <th>DATE</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>

                  <tbody>

                    {inspections.map((inspection) => (
                      <tr key={inspection.id}>

                        <td className="id">
                          {inspection.id}
                        </td>

                        <td className="product">
                          {inspection.product}
                        </td>

                        <td>
                          {inspection.date}
                        </td>

                        <td>
                          <span
                            className={`status status-${inspection.type}`}
                          >
                            {inspection.status}
                          </span>
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

            </section>

            {/* LOWER SECTION */}

            <section className="bottom-grid">

              {/* QUICK ACTIONS */}

              <div className="panel">

                <div className="panel-header">

                  <div>
                    <div className="panel-title">
                      Quick Actions
                    </div>

                    <div className="panel-subtitle">
                      Common inspection tasks
                    </div>
                  </div>

                </div>

                <div className="quick-actions">

                  <Link
                    to="/scan"
                    className="quick-card"
                  >
                    <div className="quick-icon">
                      ⊕
                    </div>

                    <div className="quick-title">
                      Start New Inspection
                    </div>

                    <div className="quick-description">
                      Upload a package image and begin analysis.
                    </div>
                  </Link>

                  <Link
                    to="/history"
                    className="quick-card"
                  >
                    <div className="quick-icon">
                      ◴
                    </div>

                    <div className="quick-title">
                      View Inspection History
                    </div>

                    <div className="quick-description">
                      Search previously scanned products.
                    </div>
                  </Link>

                  <Link
                    to="/reports"
                    className="quick-card"
                  >
                    <div className="quick-icon">
                      ▤
                    </div>

                    <div className="quick-title">
                      View Reports
                    </div>

                    <div className="quick-description">
                      Access generated compliance reports.
                    </div>
                  </Link>

                  <Link
                    to="/settings"
                    className="quick-card"
                  >
                    <div className="quick-icon">
                      ⚙
                    </div>

                    <div className="quick-title">
                      Account Settings
                    </div>

                    <div className="quick-description">
                      Manage your inspection profile.
                    </div>
                  </Link>

                </div>

              </div>

              {/* ACTIVITY */}

              <div className="panel">

                <div className="panel-header">

                  <div>
                    <div className="panel-title">
                      Recent Activity
                    </div>

                    <div className="panel-subtitle">
                      Latest system events
                    </div>
                  </div>

                </div>

                <div className="activity-list">

                  {activity.map((item) => (
                    <div
                      className="activity-item"
                      key={item.title}
                    >

                      <div
                        className={`activity-icon activity-${item.color}`}
                      >
                        {item.icon}
                      </div>

                      <div>

                        <div className="activity-title">
                          {item.title}
                        </div>

                        <div className="activity-description">
                          {item.description}
                        </div>

                        <div className="activity-time">
                          {item.time}
                        </div>

                      </div>

                    </div>
                  ))}

                </div>

              </div>

            </section>

          </div>

        </main>
      </div>
    </>
  );
}


export default Dashboard;