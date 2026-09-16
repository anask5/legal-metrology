import React from "react";
import imp from "../assets/images/emblem.png";
import Navbar from "./navbar.jsx";
import Footer from "./footer.jsx";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: "Inter", "Segoe UI", Arial, sans-serif;
          background: #f7faff;
          color: #0b1f40;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        button {
          font-family: inherit;
        }

        .home-page {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 85% 20%,
              rgba(221, 236, 255, 0.65),
              transparent 30%
            ),
            linear-gradient(
              180deg,
              #f9fcff 0%,
              #ffffff 62%,
              #f9fbff 100%
            );
        }

        

        /* =========================================
           HERO
        ========================================= */

        .hero {
          position: relative;
          overflow: hidden;
        }

        .hero-main {
          max-width: 1480px;
          min-height: 565px;
          margin: 0 auto;
          padding: 34px 58px 12px;

          display: grid;
          grid-template-columns: 1fr 1.08fr;
          align-items: center;
          gap: 25px;
        }

        .hero-copy {
          position: relative;
          z-index: 2;
          padding-top: 10px;
        }

        .hero-title {
          max-width: 650px;
          color: #0c2346;
          font-size: clamp(42px, 4.3vw, 65px);
          line-height: 1.02;
          letter-spacing: -2px;
          font-weight: 850;
        }

        .hero-title span {
          color: #146bdc;
        }

        .hero-description {
          max-width: 555px;
          margin-top: 16px;
          color: #334b6b;
          font-size: 12.5px;
          line-height: 1.55;
          font-weight: 500;
        }

        .hero-buttons {
          display: flex;
          gap: 13px;
          margin-top: 24px;
        }

        .hero-btn-primary,
        .hero-btn-secondary {
          padding: 11px 18px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 750;
          transition: all 0.2s ease;
        }

        .hero-btn-primary {
          background: #1668d8;
          color: #ffffff;
          border: 1px solid #1668d8;
          box-shadow: 0 7px 13px rgba(22, 104, 216, 0.14);
        }

        .hero-btn-primary:hover {
          background: #0f56bb;
          border-color: #0f56bb;
          transform: translateY(-1px);
        }

        .hero-btn-secondary {
          background: #ffffff;
          color: #163760;
          border: 1px solid #74a8ea;
        }

        .hero-btn-secondary:hover {
          color: #146bdc;
          border-color: #146bdc;
          background: #f8fbff;
        }

        /* =========================================
           HERO VISUAL
        ========================================= */

        .hero-visual {
          position: relative;
          min-height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-glow {
          position: absolute;
          width: 450px;
          height: 280px;
          border-radius: 50%;
          background: rgba(212, 230, 254, 0.5);
          filter: blur(35px);
          right: 0;
          top: 50px;
        }

        .product-scene {
          position: relative;
          width: 100%;
          height: 450px;
        }

        /* Phone */
        .phone {
          position: absolute;
          left: 17%;
          bottom: 32px;
          width: 108px;
          height: 200px;

          border: 4px solid #152a48;
          border-radius: 17px;
          background: #172c4a;

          box-shadow: 0 22px 35px rgba(20, 48, 88, 0.18);
          transform: rotate(-1deg);
          z-index: 3;
        }

        .phone-top {
          position: absolute;
          width: 42px;
          height: 5px;
          border-radius: 8px;
          left: 50%;
          top: 5px;
          transform: translateX(-50%);
          background: #314564;
        }

        .phone-screen {
          position: absolute;
          inset: 14px 6px 7px;
          padding: 10px 7px;
          border-radius: 12px;
          overflow: hidden;
          background: linear-gradient(180deg, #ffffff, #eef5ff);
        }

        .phone-logo {
          width: 18px;
          height: 18px;
          border-radius: 5px;
          background: #1768db;
          margin-bottom: 8px;
        }

        .phone-line {
          height: 4px;
          border-radius: 99px;
          background: #d7e3f4;
          margin-bottom: 5px;
        }

        .phone-line.short {
          width: 55%;
        }

        .phone-product {
          margin-top: 9px;
          height: 48px;
          border-radius: 7px;
          background:
            linear-gradient(
              140deg,
              #d9edf6 0%,
              #ffffff 48%,
              #b7c5d8 100%
            );
        }

        .phone-badge {
          margin-top: 8px;
          padding: 5px 6px;
          border-radius: 5px;
          background: #ecfdf5;
          color: #19845b;
          font-size: 6px;
          font-weight: 800;
        }

        .phone-bottom-line {
          margin-top: 10px;
          height: 4px;
          border-radius: 99px;
          background: #d7e3f4;
        }

        /* Bottle */
        .bottle {
          position: absolute;
          right: 29%;
          bottom: 38px;
          width: 83px;
          height: 218px;

          border-radius: 20px 20px 13px 13px;

          background: linear-gradient(
            92deg,
            #4e6072 0%,
            #d6dee7 22%,
            #f4f7fa 43%,
            #bbc6d2 76%,
            #75879b 100%
          );

          box-shadow: 0 24px 35px rgba(31, 55, 84, 0.15);
          z-index: 3;
        }

        .bottle-cap {
          position: absolute;
          top: -16px;
          left: 17px;
          width: 49px;
          height: 25px;
          border-radius: 10px 10px 2px 2px;
          background: linear-gradient(90deg, #233854, #57718f);
        }

        .bottle-neck {
          position: absolute;
          top: 7px;
          left: 27px;
          width: 29px;
          height: 21px;
          background: #d0dae5;
        }

        .bottle-label {
          position: absolute;
          top: 74px;
          left: 8px;
          right: 8px;
          height: 91px;
          border-radius: 8px;
          background: #ffffff;
          padding: 8px 6px;
        }

        .bottle-brand {
          color: #2259a8;
          font-size: 7px;
          font-weight: 900;
          text-align: center;
        }

        .bottle-text {
          margin-top: 6px;
          height: 4px;
          border-radius: 99px;
          background: #dbe5ef;
        }

        .bottle-text.short {
          width: 67%;
        }

        .bottle-mrp {
          position: absolute;
          left: -7px;
          bottom: 19px;
          padding: 4px 7px;
          border: 1px solid #f0a22a;
          background: #fffdf8;
          color: #976000;
          border-radius: 4px;
          font-size: 7px;
          font-weight: 800;
        }

        /* Chips pack */
        .chips {
          position: absolute;
          right: 5%;
          top: 67px;
          width: 145px;
          height: 165px;

          border-radius: 11px;

          background:
            linear-gradient(
              155deg,
              #f0bb44 0%,
              #d79520 46%,
              #a86c12 100%
            );

          box-shadow: 0 25px 36px rgba(119, 81, 17, 0.15);
          transform: rotate(2deg);
          z-index: 4;
        }

        .chips-inner {
          position: absolute;
          inset: 10px 10px 12px;
          border-radius: 9px;
          border: 1px solid rgba(255, 255, 255, 0.45);
          padding: 15px 11px;
          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,0.06),
              rgba(255,255,255,0)
            );
        }

        .chips-title {
          color: #2d210c;
          font-size: 23px;
          line-height: 0.95;
          font-weight: 900;
        }

        .chips-subtitle {
          margin-top: 5px;
          color: #4d350f;
          font-size: 8px;
          font-weight: 700;
        }

        .chips-image {
          position: absolute;
          left: 24px;
          bottom: 13px;
          width: 82px;
          height: 51px;
          border-radius: 50%;
          background:
            radial-gradient(
              circle at 50% 50%,
              #f2bf51 0%,
              #db9819 62%,
              #ad7111 100%
            );
          transform: rotate(-7deg);
        }

        .chips-image::after {
          content: "";
          position: absolute;
          width: 50px;
          height: 18px;
          left: 15px;
          top: 16px;
          border-radius: 50%;
          background: rgba(255, 225, 147, 0.58);
          transform: rotate(12deg);
        }

        /* Blue packet */
        .small-pack {
          position: absolute;
          right: 20%;
          bottom: 30px;
          width: 103px;
          height: 75px;
          border-radius: 7px;
          transform: rotate(-4deg);
          background:
            linear-gradient(
              150deg,
              #53a5e8 0%,
              #1377c9 65%,
              #095594 100%
            );
          box-shadow: 0 22px 30px rgba(28, 82, 135, 0.14);
          z-index: 2;
        }

        .small-pack::before {
          content: "";
          position: absolute;
          width: 70%;
          height: 4px;
          border-radius: 99px;
          background: rgba(255, 255, 255, 0.85);
          top: 13px;
          left: 15%;
        }

        .small-pack::after {
          content: "PRODUCT";
          position: absolute;
          left: 17px;
          top: 28px;
          color: white;
          font-size: 8px;
          font-weight: 900;
        }

        /* Product labels */
        .label-check {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 9px;

          border: 1px solid #bfd0e4;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.97);
          box-shadow: 0 6px 18px rgba(33, 58, 93, 0.09);

          color: #1e3557;
          font-size: 8px;
          font-weight: 800;
          white-space: nowrap;
          z-index: 7;
        }

        .label-check::before {
          content: "✓";
          width: 13px;
          height: 13px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #198754;
          color: white;
          font-size: 8px;
        }

        .label-mrp {
          right: 9%;
          top: 126px;
        }

        .label-quantity {
          right: 2%;
          top: 174px;
        }

        .label-date {
          right: 7%;
          top: 220px;
        }

        .label-origin {
          right: 4%;
          top: 266px;
        }

        .label-care {
          right: 13%;
          top: 312px;
        }

       

        /* =========================================
           RESPONSIVE
        ========================================= */

        @media (max-width: 1050px) {
          .hero-main {
            grid-template-columns: 1fr;
            padding-top: 55px;
            padding-bottom: 20px;
          }

          .hero-copy {
            max-width: 700px;
            margin: 0 auto;
            text-align: center;
          }

          .hero-description {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-buttons {
            justify-content: center;
          }

          .hero-stats {
            justify-content: center;
          }

          .hero-visual {
            max-width: 650px;
            width: 100%;
            margin: auto;
          }
        }

        @media (max-width: 760px) {
          .navbar {
            padding: 10px 10px 0;
          }

          .navbar-box {
            padding: 0 14px;
          }

          .nav-right {
            gap: 10px;
          }

          .nav-link {
            display: none;
          }

          .hero-main {
            padding: 48px 18px 10px;
          }

          .hero-title {
            font-size: 43px;
            letter-spacing: -1.4px;
          }

          .hero-description {
            font-size: 12px;
          }

          .hero-buttons {
            flex-direction: column;
          }

          .hero-btn-primary,
          .hero-btn-secondary {
            width: 100%;
          }

          .hero-visual {
            min-height: 330px;
          }

          .product-scene {
            transform: scale(0.72);
            transform-origin: top center;
            width: 140%;
            margin-left: -20%;
          }

          .feature-strip {
            padding: 0 18px;
          }

          .feature-strip-box {
            grid-template-columns: 1fr;
            padding-left: 0;
            padding-right: 0;
          }

          .feature-item {
            border-right: none !important;
            border-bottom: 1px solid #dbe4ef;
            padding: 10px 0;
          }

          .feature-item:last-child {
            border-bottom: none;
          }

          .india-accent {
            display: none;
          }

          .footer-line {
            padding: 0 18px;
          }
        }
      `}</style>

      <div className="home-page">

        {/* ================= HERO ================= */}

        <section id="home" className="hero">

          <div className="hero-main">

            {/* LEFT */}
            <div className="hero-copy">

              <h1 className="hero-title">
                AI-Powered
                <br />
                Product Compliance
                <br />
                for a <span>Safer India</span>
              </h1>

              <p className="hero-description">
                Automated verification of packaged commodities under
                Legal Metrology (Packaged Commodities) Rules, 2011.
                Empowering regulators. Ensuring consumer protection.
              </p>

              <div className="hero-buttons">
                <Link to="/login" className="hero-btn-primary">
                  Get Started
                </Link>

                <a href="#features" className="hero-btn-secondary">
                  Learn More
                </a>
              </div>

            </div>

            {/* RIGHT */}
            <div className="hero-visual">

              <div className="hero-glow" />

              <div className="product-scene">

                {/* Phone */}
                <div className="phone">
                  <div className="phone-top" />

                  <div className="phone-screen">
                    <div className="phone-logo" />

                    <div className="phone-line" />
                    <div className="phone-line short" />

                    <div className="phone-product" />

                    <div className="phone-badge">
                      ✓ COMPLIANCE VERIFIED
                    </div>

                    <div className="phone-bottom-line" />
                  </div>
                </div>

                {/* Bottle */}
                <div className="bottle">

                  <div className="bottle-cap" />
                  <div className="bottle-neck" />

                  <div className="bottle-label">
                    <div className="bottle-brand">
                      PRODUCT
                    </div>

                    <div className="bottle-text" />
                    <div className="bottle-text short" />

                    <div className="bottle-mrp">
                      MRP
                    </div>
                  </div>

                </div>

                {/* Chips */}
                <div className="chips">
                  <div className="chips-inner">
                    <div className="chips-title">
                      Potato
                      <br />
                      Chips
                    </div>

                    <div className="chips-subtitle">
                      Classic
                    </div>

                    <div className="chips-image" />
                  </div>
                </div>

                {/* Small packet */}
                <div className="small-pack" />

                {/* Floating checks */}
                <div className="label-check label-mrp">
                  MRP
                </div>

                <div className="label-check label-quantity">
                  Net Quantity
                </div>

                <div className="label-check label-date">
                  Mfg. Date
                </div>

                <div className="label-check label-origin">
                  Country of Origin
                </div>

                <div className="label-check label-care">
                  Consumer Care
                </div>

              </div>
            </div>
          </div>

          {/* Footer */}

  
        </section>

      </div>
    </>
  );
}

function Image() {
  return (
    <img src={imp} alt="Emblem of India" style={{ width: '100%', height: '100%' }} />
  )
}
export default Home;
