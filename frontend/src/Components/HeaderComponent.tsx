import React from "react";
import "../components/styles/HeaderComponent.css";

function HeaderComponent() {
    return (
        <header className="header">
            <div className="logo">
                <img src="https://cdn-icons-png.flaticon.com/512/8635/8635653.png" alt="Logo" /> {/* Логотип */}
                <span className="title">My Application</span>
            </div>
            <nav className="nav">
                <a href="#home">Home</a>
                <a href="#about">About</a>
            </nav>
        </header>
    );
}

export default HeaderComponent;