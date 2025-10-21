import React from 'react';
import {Link} from "react-router-dom";


const Register = () => {
    return (
        <div className="register">
            <div className="register__container">
                {/* Кнопка возврата на главную */}
                <Link to="/" className="register__back-button">
                    ← Back to Home
                </Link>

                <div className="register__header">
                    <h1 className="register__title">Create Account</h1>
                    <p className="register__subtitle">Join us! Please fill in your details</p>
                </div>

                <form className="register__form">
                    <div className="register__input-group">
                        <label className="register__label" htmlFor="name">
                            Full Name:
                        </label>
                        <input
                            className="register__input"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="register__input-group">
                        <label className="register__label" htmlFor="email">
                            Email:
                        </label>
                        <input
                            className="register__input"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="register__input-group">
                        <label className="register__label" htmlFor="password">
                            Password:
                        </label>
                        <input
                            className="register__input"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Create a password"
                        />
                    </div>

                    <div className="register__input-group">
                        <label className="register__label" htmlFor="confirmPassword">
                            Confirm Password:
                        </label>
                        <input
                            className="register__input"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Repeat your password"
                        />
                    </div>

                    <button type="submit" className="register__submit-button">
                        CREATE ACCOUNT
                    </button>
                </form>

                <div className="register__links">
                    <p className="register__login-text">
                        Already have an account?
                        <Link to="/login" className="register__login-link"> Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;