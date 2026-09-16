import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <style>{`      

        .footer{
          margin-top:60px;
          background:#061a2f;
          backdrop-filter:blur(18px);
          -webkit-backdrop-filter:blur(18px);
          border-top:1px solid rgba(255,255,255,0.12);
          color:white;
          padding:40px 8%;
          color:white;
        }

        .footer-container{
          display:flex;
          justify-content:space-between;
          align-items:flex-start;
          flex-wrap:wrap;
          gap:40px;
        }

        .footer-brand{
          flex:1;
          min-width:250px;
        }

        .footer-brand h2{
          color:white;
          margin-bottom:12px;
          font-size:28px;
        }

        .footer-brand p{
           color:white;
          line-height:1.7;
          max-width:350px;
        }

        .footer-links{
          flex: 1;
          display: flex;
          min-width: 200px;                        
          flex-direction: column;
          align-items: center;
        }

        .footer-links h3,
        .footer-contact h3{
          margin-bottom:15px;
          color:white;
        }
 
        .footer-links a{
          display:block;
          color:white;
          text-decoration:none;
          margin-bottom:10px;
          transition:.3s;
        }

        .footer-links a:hover{
          color:#60a5fa;
          padding-left:6px;
        }

        .footer-contact{
          flex:1;
          min-width:250px;
          text-align: -webkit-center;
        }

        .footer-contact p{
          color:white;
          margin-bottom:10px;
        }

        .copyright{
          margin-top:35px;
          padding-top:20px;
          text-align:center;
          border-top:1px solid rgba(255,255,255,.1);
          color:white;
          font-size:14px;
        }

        @media(max-width:585px){
          .footer-container{
            flex-direction:column;
            text-align:center;
            align-items: center;
          }

          .footer-brand p{
            max-width:100%;
          }

          .footer-links a:hover{
            padding-left:0;
          }
        }
      `}</style>
            <footer className="footer">
                <div className="footer-container">

                    <div className="footer-brand">
                        <h2>Title</h2>
                        <p>
                            Title efficiently shortens long URLs, making links easier to share, manage, and access while improving overall user convenience.
                        </p>
                    </div>

                    <div className="footer-links">
                        <h3>Quick Links</h3>

                        <Link to="/">Home</Link>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </div>

                    <div className="footer-contact">
                        <h3>Connect with us</h3>

                        <p>📧 support@fs0ciety.in</p>
                        <p>📞 +91 98765 43210</p>

                    </div>

                </div>

                <div className="copyright">
                    © {new Date().getFullYear()} Fsociety | Designed with ❤️ in ReactJS & ExpressJS.
                </div>
            </footer>

        </>
    );
};

export default Footer;