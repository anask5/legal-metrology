import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3002/api/shorten", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application.json"
        },
        body: JSON.stringify({
          email, password
        })
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        navigate("/createUrl")
      }
      else {
        setMessage(data.message)
      }
    }
    catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <>
      <style>{`
    
         @font-face {
              font-family: Lato;
              src: url('public/Lato-Regular.woff') format('woff');
            }
            *{
              margin:0;
              padding:0;
              box-sizing:border-box;
              font-family:Lato;
            }
    
            .login-page{
              min-height:100vh;
              display:grid;
              justify-content:center;
              align-items:center;
              grid-auto-flow: column;
              grid-template-columns:auto;
    
              background:
              radial-gradient(circle at top left,#4f46e5 0%,transparent 35%),
              radial-gradient(circle at bottom right,#06b6d4 0%,transparent 35%),
              linear-gradient(135deg,#0f172a,#111827,#1e293b);
            }
    
            .login-card{
              width:380px;
              padding:40px;
              display: flex;
              flex-direction: column;
              justify-content: center;
    
    
              background:rgba(255, 255, 255, 0.04);
              backdrop-filter:blur(25px);
              -webkit-backdrop-filter:blur(25px);
    
              border:1px solid rgba(255, 255, 255, 0.1);
              
              box-shadow:
              0 20px 40px rgba(0,0,0,.35),
              inset 0 1px rgba(255,255,255,.1);
            }
            
            .login-card h1{
              color:#fff;
              text-align:left;
              margin-bottom:10px;
              font-size:50px;
              }
              
              .login-card p{
                color:#cbd5e1;
                text-align:left;
                margin-bottom:30px;
                font-size: 20px;
                }
                
                
            .in-card{
              width:380px;
    
              padding:40px;
                  
              background:rgba(0,0,0,0);
              backdrop-filter:blur(25px);
              -webkit-backdrop-filter:blur(25px);
                  
              border:1px solid rgba(255,255,255,.15);
              border-top-right-radius:25px;
              border-bottom-right-radius:25px;
              
              box-shadow:
              0 20px 40px rgba(0,0,0,.35),
              inset 0 1px rgba(255,255,255,.1);
            }
              
            .in-card h1{
              color:#fff;
              text-align:left;
              font-size:44px;
              }
              .in-card p{
              color:#fff;
              text-align:left;
              margin-bottom:10px;
              font-size:20px;
              }
    
              .in-card img{
                width:100%;
                height:70%;
                border-radius:20px;
              }
            .in-card, .login-card{
              height:600px;
            }
    
            .input-group{
              margin-bottom:20px;
            }
    
            .input-group input{
              width:100%;
              padding:16px 2px;
              border:none;
              outline:none;
              
              border-bottom: 3px solid #000000a3;
              
    
              background:rgba(44, 44, 44, 0.03);
              color:white;
              font-size:20px;
              transition:.3s;
            }
            .input-group::valid{
              border-radius:20px;
              background:rgba(44, 44, 44, 0.03);
            }
            .input-group input::placeholder{
              color:#cbd5e1;
            }
    
            .input-group input:focus{
              border:1px solid rgba(255,255,255,.12);
              padding:16px 18px;
              border-color:#6366f1;
              border-radius:14px;
              box-shadow:0 0 15px rgba(99,102,241,.45);
            }
    
            .login-btn{
              width:100%;
              padding:16px;
              margin-top:50px;
              border:none;
              border-radius:14px;
              cursor:pointer;
    
              background:linear-gradient(135deg,#6366f1,#8b5cf6);
              color:white;
              font-size:20px;
              font-weight:600;
    
              transition:.3s;
            }
    
            .login-btn:hover{
              transform:translateY(-3px);
              box-shadow:0 10px 25px rgba(99,102,241,.45);
            }
    
            .forgot{
              text-align:center;
              margin-top:18px;
            }
    
            .forgot a{
              color:#8be9fd;
              text-decoration:none;
              font-size:15px;
            }
    
            .forgot a:hover{
              text-decoration:underline;
            }
          @media (max-width:900px){
            .in-card{
              display:none;
            }
            .login-card{
              border-radius:25px;
              height: 70%;
              width: 85vw;
            }
          }
          .gaping{
            height:60px
          }
          .W-gap{
          height: 20px
          }
    
          `}</style>
      <p className="gaping" ></p>

      <div className="login-page">

        <div className="login-card">
          <h1>Welcom Back</h1>
          <p>Login to acess the Legal Metrology Inspector System</p>
          <p className="W-gap"></p>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input type="email" placeholder="Email Address " required
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="input-group">
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button type="submit" className="login-btn" >
              Login →
            </button>
            <p> {message}</p>
          </form>
          {/* <div className="forgot">
                <a href="/">Forgot Password?</a>
              </div> */}
        </div>

      </div>
    </>
  );
};
export default Login;