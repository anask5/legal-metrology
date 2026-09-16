import React from "react";

function Footer() {
  return (
    <>
      <style>{`
        
        .feature-strip {
          max-width: 1480px;
          margin: 0 auto;
          padding: 0 58px;
        }

        .feature-strip-box {
          position: relative;
          min-height: 79px;
          padding: 12px 22px 18px;

          border-top: 1px solid #dbe4ef;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          align-items: center;
          gap: 10px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          min-height: 50px;
          padding-right: 15px;
        }

        .feature-item:not(:last-child) {
          border-right: 1px solid #dbe4ef;
        }

        .feature-icon {
          width: 31px;
          height: 31px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eef5ff;
          border: 1px solid #d2e3fb;
          color: #146bdc;
          font-size: 13px;
          font-weight: 900;
          flex: 0 0 auto;
        }

        .feature-item-title {
          color: #172f50;
          font-size: 10px;
          font-weight: 850;
        }

        .feature-item-sub {
          margin-top: 4px;
          color: #71839c;
          font-size: 8.5px;
          line-height: 1.3;
        }

        /* India accent */
        .india-accent {
          position: absolute;
          right: 0;
          bottom: -1px;
          width: 220px;
          height: 30px;
          overflow: hidden;
        }

        .wave {
          position: absolute;
          width: 260px;
          height: 35px;
          right: -20px;
          border-radius: 50%;
          transform: rotate(-8deg);
        }

        .wave.orange {
          bottom: 1px;
          border-top: 4px solid #ef7f1a;
        }

        .wave.white {
          bottom: 6px;
          border-top: 4px solid #ffffff;
          filter: drop-shadow(0 0 0 #cad4df);
        }

        .wave.green {
          bottom: 10px;
          border-top: 4px solid #138a4b;
        }

        .footer-line {
          max-width: 1480px;
          margin: 0 auto;
          padding: 0 58px;
        }

        .footer-links {
          padding: 0 0 7px;
          text-align: center;
          color: #61728b;
          font-size: 8px;
        }

        .footer-links span {
          margin: 0 8px;
          color: #b0bccb;
        }
      `}</style>

      <footer className="site-footer">

        <div className="feature-strip">
            <div className="feature-strip-box">

              <div className="feature-item">
                <div className="feature-icon">
                  ⚙
                </div>

                <div>
                  <div className="feature-item-title">
                    AI-Powered Analysis
                  </div>

                  <div className="feature-item-sub">
                    Advanced OCR and vision AI
                  </div>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  ♢
                </div>

                <div>
                  <div className="feature-item-title">
                    Rule-based Compliance
                  </div>

                  <div className="feature-item-sub">
                    Aligned with LM Rules, 2011
                  </div>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  ✓
                </div>

                <div>
                  <div className="feature-item-title">
                    Trusted Evidence
                  </div>

                  <div className="feature-item-sub">
                    Audit-ready reports
                  </div>
                </div>
              </div>

              <div className="india-accent">
                <div className="wave orange" />
                <div className="wave white" />
                <div className="wave green" />
              </div>

            </div>
          </div>

          <div className="footer-line">
            <div className="footer-links">
              Safer Products
              <span>|</span>
              Fairer Markets
              <span>|</span>
              Stronger Consumers
            </div>
          </div>

      </footer>
    </>
  );
}

export default Footer;