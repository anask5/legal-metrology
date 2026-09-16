import { React, useState } from 'react';
import { Link } from 'react-router-dom';


const CreateUrl = () => {
    const [url, setUrl] = useState('')
    const [message, setMessage] = useState('')
    async function handleSubmit() {
        try {
            console.log(url);
            const response = await fetch("http://localhost:3001/api/shorten", {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    url,
                    user: "Anas Khan"
                })
            })
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message)
                alert('REDIRECT ADDED')
            }
            else {
                setMessage(data.message)
            }
        }
        catch (e) {

        }
    }
    return (
        <div>
            <style>{`
            *{
                margin:0;
                padding:0;
                box-sizing:border-box;
                font-family:Inter,Segoe UI,sans-serif;
                }
            
            body{
                
                background: url('public/background.jpg');
                background-repeat: no-repeat;
                background-size:contain;
                background-attachment:fixed;

            }   
            .home{
                padding: 120px 8% 60px;
                min-height: 100vh;
                background:rgba(0, 0, 0, 0.30);
            }

            .home-content{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-around;
                gap: 10px;
            }
            .hero{font-size:40px;}
            .hero-p{font-size:20px;}
            .hero,.hero-p{
                text-align: center;
            }
            
            .home-para{
                max-width: 400px;
                h3{
                font-size:30px;
                padding:15px;
                }
            }
                
            .home-ace {
                padding: 20px;
                margin: 20px;
                border: 1px solid #070606;
                border-radius: 5px;
                height: 250px;
                width:300px;
                background:#1f4e79; 

                box-shadow: 0 10px 30px rgba(0,0,0,0.8)

            }
                .buttons{
          display:flex;
          justify-content:center;
          gap:20px;
          flex-wrap:wrap;
        }

        .btn{
          padding:15px 30px;
          border-radius:12px;
          text-decoration:none;
          font-weight:600;
          transition:.3s;
        }

        .primary{
          background:linear-gradient(135deg,#3b82f6,#6366f1);
          color:white;
        }

        .secondary{
          border:1px solid rgba(255,255,255,.2);
          background:rgba(242, 20, 20, 0.94);
          color:white;
          backdrop-filter:blur(12px);
        }

        .btn:hover{
          transform:translateY(-4px);
          box-shadow:0 12px 25px rgba(59,130,246,.35);
        }
            .wage{
            height:30px;
            }
            .wa-ge{
            height:50px;
            }

            `}
            </style>
            <div className='wa-ge'></div>
            <div className='home'>
                <h1 className='hero'>AI-Powered Product Compliance for a Safer India</h1>
                <p className='hero-p'>Automated verification of packaged commodities under Legal Metrology (Packaged Commodities)Rules, 2011. Empowering inspectors. Ensuring consumer protection.</p>

                <div className='wa-ge'></div>

                <div className="Get-Started"></div>
                <div className="Learn-More"></div>

                <div className='home-img'></div>
                
                <div className='home-content'>
                    <div className='home-para'>
                        <h3>How It Works?</h3>
                        <ol>
                            <li><b>Paste your URL</b> in the input area.</li>
                            <li><b>click on 'Shorten Now'.</b> your URL will be generated in seconds</li>
                            <li><b>Click on the 'Copy' button</b>, to copy your link</li>
                        </ol>
                        <div className='wage'></div>
                        <ul >
                            <div className="buttons">
                                <Link to="/login" className="btn primary">
                                    Login
                                </Link>

                                <Link to="/register" className="btn secondary">
                                    Register
                                </Link>
                            </div>
                        </ul>
                    </div>

                    <div className='home-ace'>
                        <div className='head-in'>
                            <h3>Paste Your Long URL</h3>
                            <p>Enter valid URL below and instantly generate a secure, shortened link</p>
                        </div>
                        <div className='input'>
                            <input type='text' placeholder='Enter the url' onChange={(e) => setUrl(e.target.value)} />
                            <button type='submit' onClick={handleSubmit}> Shorten Now </button>
                            <p> {message} </p>



                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default CreateUrl;
