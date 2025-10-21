import React, {FC, ReactNode} from 'react'
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import MainPage from "../pages/MainPage";
import Logo from '../assets/images/logo.svg';



const NavbarMain: FC = () => {

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
                    <Link to="/login">
                        <button className='button'>Login</button>
                    </Link>
                </div>
            </nav>

    )
}
export default NavbarMain