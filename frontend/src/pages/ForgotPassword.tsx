import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    return (
        <div className="login">
            <div className="login__container">
                <Link to="/" className="login__back-button">
                    ← Back to Main Page
                </Link>
                <div className="login__header">
                    <h1 className="login__title">Reset Password</h1>
                    <p className="login__subtitle">Enter your email to reset your password</p>
                </div>

                <form className="login__form">
                    <div className="login__input-group">
                        <label className="login__label" htmlFor="email">
                            Email:
                        </label>
                        <input
                            className="login__input"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                        />
                    </div>

                    <button type="submit" className="login__submit-button">
                        RESET PASSWORD
                    </button>
                </form>

                <div className="login__links">
                    <Link to="/login" className="login__link-button">
                        Back to Login
                    </Link>
                    <Link to="/register" className="login__link-button">
                        Create an account
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;