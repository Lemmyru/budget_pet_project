import React from 'react';
import NavbarMain from "../components/NavbarMain";
import {Link} from 'react-router-dom';

const Login = () => {
    return (

        <div className="login">
            <div className="login__container">
                <Link to="/" className="login__back-button">
                    ← Back to Main Page
                </Link>
                <div className="login__header">
                    <h1 className="login__title">Hello</h1>
                    <p className="login__subtitle">Welcome! Please login to your account</p>
                </div>

                <form className="login__form">
                    <div className="login__input-group">
                        <label className="login__label" htmlFor="name">
                            Name:
                        </label>
                        <input
                            className="login__input"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="login__input-group">
                        <label className="login__label" htmlFor="password">
                            Password:
                        </label>
                        <input
                            className="login__input"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button type="submit" className="login__submit-button">
                        Register now
                    </button>
                </form>

                <div className="login__links">
                    <Link to="/register" className="login__link-button">
                        Create an account
                    </Link>
                    <Link to="/forgot-password" className="login__link-button">
                        Don't remember password
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;