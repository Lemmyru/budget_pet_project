import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/api.auth';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // TODO: Заменить вызов когда бэкенд будет готов
            console.log('Login attempt with:', formData);

            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

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

                {error && (
                    <div className="login__error">
                        {error}
                    </div>
                )}

                <form className="login__form" onSubmit={handleSubmit}>
                    <div className="login__input-group">
                        <label className="login__label" htmlFor="email">
                            Email:
                        </label>
                        <input
                            className="login__input"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
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
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="login__submit-button"
                        disabled={loading}
                    >
                        {loading ? 'LOGGING IN...' : 'LOGIN'}
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
};

export default Login;