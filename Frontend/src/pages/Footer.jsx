import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <style>{`
        .site-footer {
          width: 100%;
          background: #ffffff;
          border-top: 1px solid #dce5ef;
          margin-top: 40px;
          color: #1a3353;
          font-family: inherit;
        }

        /* FEATURE STRIP */
        .feature-strip {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .feature-strip-box {
          position: relative;
          min-height: 80px;
          padding: 16px 20px;
          border-bottom: 1px solid #e4ecf5;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          align-items: center;
          gap: 20px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .feature-item:not(:last-child) {
          border-right: 1px solid #e2ebf4;
          padding-right: 15px;
        }

        .feature-icon {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eef5ff;
          border: 1px solid #d2e3fb;
          color: #146bdc;
          font-size: 16px;
          flex-shrink: 0;
        }

        .feature-item-title {
          color: #112948;
          font-size: 12px;
          font-weight: 700;
        }

        .feature-item-sub {
          margin-top: 2px;
          color: #647893;
          font-size: 10px;
          line-height: 1.35;
        }

        /* MAIN FOOTER CONTENT */
        .footer-main {
          max-width: 1440px;
          margin: 0 auto;
          padding: 36px 32px 24px;
          display: grid;
          grid-template-columns: 2fr 1fr 1.2fr 1.4fr;
          gap: 32px;
        }

        .footer-col h4 {
          font-size: 12px;
          font-weight: 800;
          color: #0f2d4e;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 14px;
          position: relative;
        }

        .footer-col h4::after {
          content: "";
          display: block;
          width: 24px;
          height: 2px;
          background: #1a73e8;
          margin-top: 5px;
          border-radius: 2px;
        }

        .footer-desc {
          font-size: 11px;
          color: #556c87;
          line-height: 1.6;
          margin-bottom: 14px;
        }

        .footer-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .footer-links-list li a {
          color: #3b5370;
          text-decoration: none;
          font-size: 11px;
          font-weight: 500;
          transition: color 0.15s ease, transform 0.15s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .footer-links-list li a:hover {
          color: #126ad8;
          transform: translateX(2px);
        }

        .contact-card {
          background: #f6f9fc;
          border: 1px solid #e1e9f2;
          border-radius: 8px;
          padding: 12px 14px;
          font-size: 11px;
          color: #38506e;
          line-height: 1.5;
        }

        .contact-card strong {
          color: #112948;
        }

        .contact-item {
          margin-top: 6px;
          display: flex;
          align-items: flex-start;
          gap: 6px;
        }

        /* TRICOLOR BAR */
        .tricolor-strip {
          height: 3px;
          width: 100%;
          display: flex;
        }
        .tricolor-strip .saffron { flex: 1; background: #ff9933; }
        .tricolor-strip .white { flex: 1; background: #ffffff; border-top: 1px solid #eee; border-bottom: 1px solid #eee; }
        .tricolor-strip .green { flex: 1; background: #138808; }

        /* LEGAL & COPYRIGHT BAR */
        .footer-bottom {
          background: #f8fbfe;
          border-top: 1px solid #e5edf5;
          padding: 16px 32px;
        }

        .footer-bottom-inner {
          max-width: 1440px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .mandatory-links {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px 14px;
        }

        .mandatory-links a {
          color: #4a627d;
          font-size: 10.5px;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.15s;
        }

        .mandatory-links a:hover {
          color: #146bdc;
          text-decoration: underline;
        }

        .mandatory-links span {
          color: #cbd7e4;
          font-size: 10px;
        }

        .copyright-text {
          font-size: 10.5px;
          color: #6a7d94;
          text-align: right;
        }

        .nic-badge {
          font-size: 9.5px;
          color: #7b8e9f;
          margin-top: 2px;
        }

        @media (max-width: 1024px) {
          .feature-strip-box {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .feature-item:not(:last-child) {
            border-right: none;
            border-bottom: 1px solid #e8f0f8;
            padding-bottom: 10px;
          }
          .footer-main {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 680px) {
          .feature-strip,
          .footer-main,
          .footer-bottom {
            padding-left: 18px;
            padding-right: 18px;
          }
          .footer-main {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .footer-bottom-inner {
            flex-direction: column;
            align-items: flex-start;
          }
          .copyright-text {
            text-align: left;
          }
        }
      `}</style>

      <footer className="site-footer">
        {/* TOP VALUE STRIP */}
        <div className="feature-strip">
          <div className="feature-strip-box">
            <div className="feature-item">
              <div className="feature-icon">⚙</div>
              <div>
                <div className="feature-item-title">AI & Vision Analysis</div>
                <div className="feature-item-sub">
                  Automated OCR label detection and extraction
                </div>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">⚖</div>
              <div>
                <div className="feature-item-title">Rule Compliance Engine</div>
                <div className="feature-item-sub">
                  Aligned with Legal Metrology (Packaged Commodities) Rules, 2011
                </div>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div>
                <div className="feature-item-title">Statutory Inspection Records</div>
                <div className="feature-item-sub">
                  Tamper-evident audit trails and inspection reports
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DETAILED FOOTER NAVIGATION */}
        <div className="footer-main">
          {/* COL 1: PORTAL INFO */}
          <div className="footer-col">
            <h4>Legal Metrology Division</h4>
            <p className="footer-desc">
              National Inspection & Packaging Verification Portal under the
              Department of Consumer Affairs, Ministry of Consumer Affairs, Food &
              Public Distribution, Government of India.
            </p>
            <p className="footer-desc">
              Promoting fair trade, consumer rights protection, and statutory
              standards for packaged commodities across India.
            </p>
          </div>

          {/* COL 2: QUICK NAVIGATION */}
          <div className="footer-col">
            <h4>Portal Services</h4>
            <ul className="footer-links-list">
              <li><Link to="/dashboard">Inspection Dashboard</Link></li>
              <li><Link to="/scan">Scan Product Package</Link></li>
              <li><Link to="/history">Inspection Registers</Link></li>
              <li><Link to="/reports">Compliance Analytics</Link></li>
              <li><Link to="/settings">Officer Preferences</Link></li>
            </ul>
          </div>

          {/* COL 3: STATUTORY REFERENCES */}
          <div className="footer-col">
            <h4>Legal & Regulations</h4>
            <ul className="footer-links-list">
              <li>
                <a
                  href="https://consumeraffairs.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Dept. of Consumer Affairs ↗
                </a>
              </li>
              <li>
                <a href="#lm-act">Legal Metrology Act, 2009</a>
              </li>
              <li>
                <a href="#lm-rules">Packaged Commodities Rules, 2011</a>
              </li>
              <li>
                <a href="#enforcement">Enforcement Guidelines</a>
              </li>
              <li>
                <a href="#notifications">Gazette Notifications</a>
              </li>
            </ul>
          </div>

          {/* COL 4: HELPDESK & NODAL DETAILS */}
          <div className="footer-col">
            <h4>Nodal Helpdesk</h4>
            <div className="contact-card">
              <div><strong>National Consumer Helpline:</strong> 1915</div>
              <div className="contact-item">
                <span>✉</span>
                <span>dir-lm-ca@nic.in</span>
              </div>
              <div className="contact-item">
                <span>📍</span>
                <span>Krishi Bhawan, New Delhi - 110001</span>
              </div>
            </div>
          </div>
        </div>

        {/* TRICOLOR NATIONAL ACCENT */}
        <div className="tricolor-strip">
          <div className="saffron" />
          <div className="white" />
          <div className="green" />
        </div>

        {/* MANDATORY STATUTORY & POLICY BAR */}
        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <nav className="mandatory-links" aria-label="Legal Policy Links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <span>•</span>
              <Link to="/hyperlinking-policy">Hyperlinking Policy</Link>
              <span>•</span>
              <Link to="/terms-conditions">Terms & Conditions</Link>
              <span>•</span>
              <Link to="/disclaimer">Disclaimer</Link>
              <span>•</span>
              <Link to="/accessibility-statement">Accessibility</Link>
              <span>•</span>
              <Link to="/help">Help & FAQ</Link>
            </nav>

            <div className="copyright-text">
              <div>
                © {new Date().getFullYear()} Legal Metrology Division, Government of India. All rights reserved.
              </div>
              <div className="nic-badge">
                Designed for Official Regulatory Compliance & Field Inspections
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;