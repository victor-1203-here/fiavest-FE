import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {

    const logoutHandler = () => {
        localStorage.clear();
        window.location.pathname = "/login"
    };

    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <div>
                        <Link to={"/"} className="navBtn">CLIENTS</Link>
                        <Link to={"/users"} className="navBtn">USERS</Link>
                        <Link to={"/posting"} className="navBtn">POSTING</Link>
                    </div>
                    <div>
                        <div className="navBtn-1" onClick={logoutHandler}>LOGOUT</div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar