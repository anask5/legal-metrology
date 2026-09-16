
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar.jsx";

function History() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const historyData = [
    {
      id: "INS-20250902-001",
      product: "ABC Shampoo",
      category: "Personal Care",
      date: "2 Sep 2025",
      time: "10:42 AM",
      confidence: 94,
      status: "Potential Violation",
      type: "danger",
    },
    {
      id: "INS-20250902-002",
      product: "Fresh Bites Chips",
      category: "Food",
      date: "2 Sep 2025",
      time: "09:35 AM",
      confidence: 97,
      status: "Compliant",
      type: "success",
    },
    {
      id: "INS-20250902-003",
      product: "Glow Face Wash",
      category: "Cosmetics",
      date: "1 Sep 2025",
      time: "04:18 PM",
      confidence: 82,
      status: "Pending",
      type: "pending",
    },
    {
      id: "INS-20250902-014",
      product: "Premium Rice",
      category: "Food",
      date: "1 Sep 2025",
      time: "02:51 PM",
      confidence: 96,
      status: "Compliant",
      type: "success",
    },
    {
      id: "INS-20250831-009",
      product: "Energy Drink",
      category: "Beverage",
      date: "31 Aug 2025",
      time: "11:26 AM",
      confidence: 89,
      status: "Potential Violation",
      type: "danger",
    },
    {
      id: "INS-20250831-008",
      product: "Organic Atta",
      category: "Food",
      date: "31 Aug 2025",
      time: "10:12 AM",
      confidence: 98,
      status: "Compliant",
      type: "success",
    },
    {
      id: "INS-20250830-006",
      product: "Herbal Soap",
      category: "Personal Care",
      date: "30 Aug 2025",
      time: "03:45 PM",
      confidence: 91,
      status: "Compliant",
      type: "success",
    },
    {
      id: "INS-20250830-004",
      product: "Fruit Juice",
      category: "Beverage",
      date: "30 Aug 2025",
      time: "01:20 PM",
      confidence: 76,
      status: "Potential Violation",
      type: "danger",
    },
  ];

  const filteredData = useMemo(() => {
    return historyData.filter((item) => {
      const matchesSearch =
        item.product.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const itemsPerPage = 6;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / itemsPerPage)
  );

  const visibleData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

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

        .history-page {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 80% 0%,
              rgba(32, 110, 220, 0.04),
              transparent 24%
            ),
            #f5f8fc;
        }

        .history-content {
          margin-left: 230px;
          min-height: 100vh;
        }

        .history-header {
          position: sticky;
          top: 0;
          z-index: 40;

          min-height: 78px;
          padding: 0 30px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          background: rgba(255, 255, 255, 0.94);
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

          text-decoration: none;

          transition: all 0.2s ease;
        }

        .new-scan:hover {
          transform: translateY(-1px);

          box-shadow:
            0 10px 22px rgba(21, 94, 219, 0.25);
        }

        .history-main {
          padding: 26px 30px 35px;
        }

        .history-panel {
          padding: 20px;

          border: 1px solid #e1e8f0;
          border-radius: 14px;

          background: #ffffff;

          box-shadow:
            0 3px 12px rgba(24, 52, 84, 0.025);
        }

        .history-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;

          margin-bottom: 20px;
        }

        .panel-title {
          color: #183756;
          font-size: 14px;
          font-weight: 800;
        }

        .panel-subtitle {
          margin-top: 4px;

          color: #8392a5;
          font-size: 8px;
        }

        .scan-count {
          padding: 7px 10px;

          border-radius: 7px;

          background: #edf5ff;
          color: #1768db;

          font-size: 8px;
          font-weight: 800;
        }

        .filters {
          display: flex;
          align-items: center;
          gap: 10px;

          margin-bottom: 20px;
        }

        .search-wrapper {
          position: relative;
          flex: 1;
        }

        .search-icon {
          position: absolute;
          left: 13px;
          top: 50%;

          transform: translateY(-50%);

          color: #91a0b1;
          font-size: 13px;
        }

        .search-input {
          width: 100%;
          height: 40px;

          padding: 0 14px 0 36px;

          border: 1px solid #dfe6ee;
          border-radius: 8px;

          outline: none;

          background: #fbfdff;

          color: #294563;
          font-size: 9px;

          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .search-input:focus {
          border-color: #72a8ed;

          box-shadow:
            0 0 0 3px rgba(32, 110, 220, 0.08);
        }

        .filter-select {
          height: 40px;

          min-width: 145px;

          padding: 0 12px;

          border: 1px solid #dfe6ee;
          border-radius: 8px;

          outline: none;

          background: #fbfdff;

          color: #52677f;
          font-size: 9px;

          cursor: pointer;
        }

        .table-wrapper {
          width: 100%;
          overflow-x: auto;
        }

        .history-table {
          width: 100%;

          border-collapse: collapse;

          min-width: 760px;
        }

        .history-table th {
          padding: 11px 10px;

          border-bottom: 1px solid #e7edf3;

          color: #8b9aac;

          font-size: 7px;
          font-weight: 800;

          text-align: left;

          letter-spacing: 0.4px;
        }

        .history-table td {
          padding: 15px 10px;

          border-bottom: 1px solid #f0f3f7;

          color: #53677f;

          font-size: 8px;
        }

        .history-table tr:last-child td {
          border-bottom: none;
        }

        .history-table tbody tr {
          transition: background 0.15s ease;
        }

        .history-table tbody tr:hover {
          background: #fafcff;
        }

        .inspection-id {
          color: #74879f !important;
          font-size: 7px !important;
          font-weight: 600;
        }

        .product-name {
          color: #183858 !important;
          font-size: 9px !important;
          font-weight: 750;
        }

        .category {
          color: #70839a !important;
        }

        .date-cell {
          color: #52677f !important;
        }

        .time {
          margin-top: 3px;

          color: #a0adbb;
          font-size: 7px;
        }

        .confidence {
          color: #365b7d;
          font-weight: 700;
        }

        .status {
          display: inline-flex;
          align-items: center;
          gap: 5px;

          padding: 5px 8px;

          border-radius: 999px;

          font-size: 7px;
          font-weight: 800;

          white-space: nowrap;
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

        .status-dot {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: currentColor;
        }

        .view-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          padding: 6px 10px;

          border: 1px solid #dbe5f0;
          border-radius: 6px;

          background: #ffffff;

          color: #1768db;

          font-size: 7px;
          font-weight: 800;

          text-decoration: none;

          transition: all 0.2s ease;
        }

        .view-button:hover {
          border-color: #9fc2eb;
          background: #edf5ff;
        }

        .empty-state {
          padding: 55px 20px;

          text-align: center;
        }

        .empty-icon {
          width: 45px;
          height: 45px;

          margin: 0 auto 12px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: #edf5ff;

          color: #1768db;

          font-size: 17px;
        }

        .empty-title {
          color: #294563;
          font-size: 11px;
          font-weight: 800;
        }

        .empty-text {
          margin-top: 5px;

          color: #8b9aac;
          font-size: 8px;
        }

        .pagination {
          display: flex;
          align-items: center;
          justify-content: space-between;

          margin-top: 18px;
          padding-top: 16px;

          border-top: 1px solid #edf1f5;
        }

        .pagination-info {
          color: #8a99aa;
          font-size: 8px;
        }

        .pagination-controls {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .page-button {
          min-width: 28px;
          height: 28px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid #dfe6ee;
          border-radius: 6px;

          background: #ffffff;

          color: #70839a;

          font-size: 8px;
          font-weight: 700;

          cursor: pointer;

          transition: all 0.2s ease;
        }

        .page-button:hover:not(:disabled) {
          border-color: #a9c8eb;
          color: #1768db;
        }

        .page-button.active {
          border-color: #1768db;

          background: #1768db;

          color: #ffffff;
        }

        .page-button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        @media (max-width: 850px) {
          .history-content {
            margin-left: 70px;
          }

          .history-header {
            padding: 0 18px;
          }

          .history-main {
            padding: 20px 18px 30px;
          }

          .header-date {
            display: none;
          }
        }

        @media (max-width: 620px) {
          .history-header {
            min-height: 70px;
          }

          .header-title h1 {
            font-size: 17px;
          }

          .new-scan {
            padding: 9px 12px;
          }

          .profile {
            display: none;
          }

          .filters {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-select {
            width: 100%;
          }

          .pagination {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }
      `}</style>

      <div className="history-page">

        <Sidebar />

        <main className="history-content">

          <header className="history-header">

            <div className="header-title">
              <h1>Scan History</h1>

              <p>
                View and manage previous Legal Metrology inspections
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
                to="/scan_prod"
                className="new-scan"
              >
                <span>+</span>
                New Scan
              </Link>

            </div>

          </header>

          <div className="history-main">

            <section className="history-panel">

              <div className="history-panel-header">

                <div>
                  <div className="panel-title">
                    Inspection Records
                  </div>

                  <div className="panel-subtitle">
                    Previously scanned products and their compliance status
                  </div>
                </div>

                <div className="scan-count">
                  {filteredData.length} Records
                </div>

              </div>

              <div className="filters">

                <div className="search-wrapper">

                  <span className="search-icon">
                    ⌕
                  </span>

                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search product, category or inspection ID..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                  />

                </div>

                <select
                  className="filter-select"
                  value={statusFilter}
                  onChange={(e) =>
                    handleStatusChange(e.target.value)
                  }
                >
                  <option value="All">
                    All Status
                  </option>

                  <option value="Compliant">
                    Compliant
                  </option>

                  <option value="Potential Violation">
                    Potential Violation
                  </option>

                  <option value="Pending">
                    Pending
                  </option>
                </select>

              </div>

              <div className="table-wrapper">

                {visibleData.length > 0 ? (

                  <table className="history-table">

                    <thead>
                      <tr>
                        <th>INSPECTION ID</th>
                        <th>PRODUCT</th>
                        <th>CATEGORY</th>
                        <th>DATE & TIME</th>
                        <th>CONFIDENCE</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>

                    <tbody>

                      {visibleData.map((inspection) => (

                        <tr key={inspection.id}>

                          <td className="inspection-id">
                            {inspection.id}
                          </td>

                          <td className="product-name">
                            {inspection.product}
                          </td>

                          <td className="category">
                            {inspection.category}
                          </td>

                          <td className="date-cell">
                            {inspection.date}

                            <div className="time">
                              {inspection.time}
                            </div>
                          </td>

                          <td className="confidence">
                            {inspection.confidence}%
                          </td>

                          <td>

                            <span
                              className={`status status-${inspection.type}`}
                            >
                              <span className="status-dot" />
                              {inspection.status}
                            </span>

                          </td>

                          <td>

                            <button
                              className="view-button"
                              onClick={() =>
                                alert(
                                  `Inspection: ${inspection.id}`
                                )
                              }
                            >
                              View Details
                            </button>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                ) : (

                  <div className="empty-state">

                    <div className="empty-icon">
                      ◷
                    </div>

                    <div className="empty-title">
                      No inspections found
                    </div>

                    <div className="empty-text">
                      Try changing your search or status filter.
                    </div>

                  </div>

                )}

              </div>

              {filteredData.length > 0 && (

                <div className="pagination">

                  <div className="pagination-info">
                    Showing{" "}
                    {Math.min(
                      (currentPage - 1) * itemsPerPage + 1,
                      filteredData.length
                    )}
                    -
                    {Math.min(
                      currentPage * itemsPerPage,
                      filteredData.length
                    )}{" "}
                    of {filteredData.length} inspections
                  </div>

                  <div className="pagination-controls">

                    <button
                      className="page-button"
                      disabled={currentPage === 1}
                      onClick={() =>
                        setCurrentPage((page) =>
                          Math.max(1, page - 1)
                        )
                      }
                    >
                      ←
                    </button>

                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1
                    ).map((page) => (

                      <button
                        key={page}
                        className={`page-button ${
                          currentPage === page
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          setCurrentPage(page)
                        }
                      >
                        {page}
                      </button>

                    ))}

                    <button
                      className="page-button"
                      disabled={currentPage === totalPages}
                      onClick={() =>
                        setCurrentPage((page) =>
                          Math.min(totalPages, page + 1)
                        )
                      }
                    >
                      →
                    </button>

                  </div>

                </div>

              )}

            </section>

          </div>

        </main>

      </div>
    </>
  );
}

export default History;
