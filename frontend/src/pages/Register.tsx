import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/api.auth';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await AuthService.register(
                formData.name,
                formData.email,
                formData.password
            );
            const userData = {
                id: response.id,
                name: response.name,
                email: response.email
            };

            console.log('User data to save:', userData);

            localStorage.setItem("token", response.access_token);
            localStorage.setItem("user", JSON.stringify(userData));


            navigate('/dashboard');
        }
        catch (err: any) {
            console.log('Full error:', err);

            if (err.response?.status === 422) {
                setError('Password must be at least 6 characters long');
            }
            else if (err.response?.data?.detail) {
                if (typeof err.response.data.detail === 'string') {
                    setError(err.response.data.detail);
                }
                else if (Array.isArray(err.response.data.detail)) {
                    const firstError = err.response.data.detail[0];
                    if (firstError?.msg) {
                        setError(firstError.msg);
                    } else {
                        setError('Validation error');
                    }
                }
                else if (typeof err.response.data.detail === 'object') {
                    setError('Password must be at least 6 characters long');
                } else {
                    setError('Registration failed');
                }
            } else if (err.message) {
                setError(err.message);
            } else {
                setError('Registration failed');
            }}
        finally {
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
                    <h1 className="login__title">Create Account</h1>
                    <p className="login__subtitle">Join us! Please fill in your details</p>
                </div>

                {error && (
                    <div className="login__error">
                        {error}
                    </div>
                )}

                <form className="login__form" onSubmit={handleSubmit}>
                    <div className="login__input-group">
                        <label className="login__label" htmlFor="name">
                            Full Name:
                        </label>
                        <input
                            className="login__input"
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

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
                            placeholder="Create a password"
                            required
                        />
                    </div>

                    <div className="login__input-group">
                        <label className="login__label" htmlFor="confirmPassword">
                            Confirm Password:
                        </label>
                        <input
                            className="login__input"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Repeat your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="login__submit-button"
                        disabled={loading}
                    >
                        {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
                    </button>
                </form>

                <div className="login__links">
                    <Link to="/login" className="login__link-button">
                        Already have an account? Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;