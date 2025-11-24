import React, { FC, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import MainPage from "../pages/MainPage";
import Logo from '../assets/images/logo.svg';

const NavbarMain: FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Проверяем, авторизован ли пользователь
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');
            setIsAuthenticated(!!(token && user));
        };

        checkAuth();

        const handleStorageChange = () => {
            checkAuth();
        };

        window.addEventListener('storage', handleStorageChange);

        const interval = setInterval(checkAuth, 1000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <Link to="/">
                    <Logo/>
                </Link>
            </div>
            <div className="navbar__menu">
                <a href="#why-us">why us</a>
                <a href="#pricing">pricing</a>
                <a href="#contacts">contacts</a>
            </div>
            <div className="navbar__button">
                {isAuthenticated ? (
                    <Link to="/dashboard">
                        <button className='button'>Dashboard</button>
                    </Link>
                ) : (
                    <Link to="/login">
                        <button className='button'>Login</button>
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default NavbarMain;