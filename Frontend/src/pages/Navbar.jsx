import React from 'react';
import {useEffect , useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();
    const [loggedIn,setLoggedIn] = useState('');
    const [message ,setMessage] = useState('');

    useEffect (() => {
        checkLogin();
    }, [])

    async function handleLogin (){
        try {
            const response = await fetch("http://localhost:3000/api/logout", 
                {
                credentials: 'include',
                method : "POST"
                },
            )
            if(response.ok){
                setLoggedIn(false);
                const data = await response.json();
                window.alert(data.message),
                navigate("/")
            }
        }
        catch(err){
            console.log(err.message);
        }
    }
    async function checkLogin(){
    const response = await fetch("http://localhost:3000/api/me", {
            credentials: "include",
    });

    if(response.ok) {
        setLoggedIn(true);
    }
    else{
        setLoggedIn(false);
    }
}

    return (
        <div>
            <style>{`
            }
            *{
                margin:0;
                padding:0;
                box-sizing:border-box;
            }

            .navbar{
                display:flex;
                justify-content:space-between;
                align-items:center;
                padding:15px 60px;
                background:#0a2540;
                border-radius:5px;
                 
            }
            
            .nav-links{
                padding:30px;
                display:flex;
                flex-direction:column;
                justify-content:space-between;
                
            }

            a {
                text-decoration: none;
                color:white;
            }
            
            .navbar ul{
                display:flex;
                align-items:center;
                gap:14px;
                list-style:none;
            }
            .navbar li{
                padding: 8px;
                border-radius: 5px;
            }
            
            .navbar li:hover{
                transform:translateY(-4px);
                box-shadow:0 10px 25px rgba(99,102,241,.45);
                background:#556447;
            }
            nav{
                position:fixed;
                top:20px;
                left:50%;
                transform:translateX(-50%);
                width:92%;
                max-width:1200px;
                z-index:1000;
                background:#efe7d8;
                border-radius: 5px;
            }


            `}</style>
            <nav>
                <div className="navbar">

                    <div className="logo">
                        <Link to="/">
                            Home
                        </Link>
                    </div>

                    <ul>
                        <Link to="/login">
                            <li>Login</li>
                        </Link>

                        <Link to="/register">
                            <li>Register</li>
                        </Link>
                    </ul>

                </div>
            </nav>    
        </div>
    );
}

export default Navbar;
