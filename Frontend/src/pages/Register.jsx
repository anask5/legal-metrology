import React from 'react';
import {Link,useNavigate} from 'react-router-dom';
import { useState } from 'react';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message,setMessage] = useState('');
    async function handleReg(e) {
        e.preventDefault()

        try {
            const response = await fetch ("http://localhost:3000/api/register" , {
                credentials: "include",
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                name,
                email,
                password,
                })
            });
            const data = await response.json();
            if (response.ok){
                setMessage(data.message);
                navigate("/createUrl")
            }
            else{
                setMessage(data.message);
            }
        }
        catch(err){
            console.log(err)
        }}
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
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:Inter,Segoe UI,sans-serif;
        }

        .register-page{
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

        .register-card{
          width:380px;
          padding:40px;
          display: flex;
          flex-direction: column;
          justify-content: center;


          background:rgba(255, 255, 255, 0.04);
          backdrop-filter:blur(25px);
          -webkit-backdrop-filter:blur(25px);

          border:1px solid rgba(255, 255, 255, 0.1);
          border-top-left-radius: 25px;
          border-bottom-left-radius: 25px;

          box-shadow:
          0 20px 40px rgba(0,0,0,.35),
          inset 0 1px rgba(255,255,255,.1);
        }

        .register-card h1{
          text-align:left;
          color:white;
          margin-bottom:10px;
          font-size:34px;
        }

        .register-card p{
          text-align:left;
          color:#cbd5e1;
          margin-bottom:30px;
        }
          .reg-card{
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

          .reg-card h1{
            text-align:left;
            color:white;
            margin-bottom:10px;
            margin-top: 15px;
            font-size:34px;
          }
            
          .reg-card p{
            text-align:left;
            color:#cbd5e1;
            margin-bottom:30px;
          }
          
          .reg-card img{
            width:100%;
            height:80%;
            border-radius:12px;
          }
        .register-card, .reg-card{
          height:600px
        }
        .input-group{
          margin-bottom:18px;
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

        .register-btn{
          width:100%;
          padding:15px;
          border:none;
          border-radius:12px;
          cursor:pointer;
          background:linear-gradient(135deg,#3b82f6,#6366f1);
          color:white;
          font-size:16px;
          font-weight:600;
          transition:.3s;
        }

        .register-btn:hover{
          transform:translateY(-3px);
          box-shadow:0 10px 20px rgba(59,130,246,.4);
        }

        .login-link{
          text-align:center;
          margin-top:20px;
          color:#cbd5e1;
        }

        .login-link a{
          color:#60a5fa;
          text-decoration:none;
          font-weight:600;
        }

        .login-link a:hover{
          text-decoration:underline;
        }

         @media (max-width:900px){
        .reg-card{
          display:none;
        }
        .register-card{
          border-radius:25px;
          height: 82%;
          width: 85vw;
        }
      }
       @media(min-width:850px){
          .wa-ge{
          display:none;
          }

        }

      .wa-ge{
        height:35px;
      }
           .gaping{
        height:40px
      }

      `}</style>
      <p className="gaping" ></p>

      <p className="wa-ge"></p>
      <div className="register-page">
        <div className="register-card">
          <h1>Register</h1>
          <p>Create your Student Management account</p>
          <form onSubmit={handleReg}>
            <div className="input-group">
              <input type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="input-group">
              <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="input-group">
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button type="submit" className="register-btn">
              Create Account
            </button>
          </form>
          <p>{message}</p>
          <div className="login-link">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </div>
        </div>
        <div className="reg-card">
          <h1>Welcome aboard!</h1>
          <p>Register to start your journey</p>

        </div>
      </div>
    </>
  );
};

export default Register;