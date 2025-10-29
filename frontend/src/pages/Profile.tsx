import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import User from "../assets/images/user.png";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Заглушки данных - в будущем заменим на бэкенд
    const mockUserData = {
        name: 'Иван Иванов',
        email: 'ivan@example.com',
        plan: 'free',
        registrationDate: '15 января 2024',
        projectsUsed: 3,
        projectsLimit: 5,

    };


    const loadUserData = async () => {
        try {
            setLoading(true);
            setError('');


            // const response = await fetch('/api/user/profile');
            // const data = await response.json();
            // setUserData(data);

            // Заглушка:
            await new Promise(resolve => setTimeout(resolve, 1000));
            setUserData(mockUserData);
        } catch (err) {
            setError('Ошибка загрузки данных профиля');
            console.error('Profile loading error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);


    if (loading) {
        return (
            <div className="profile">
                <div className="profile__loading">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile">
                <div className="profile__error">
                    {error}
                    <button onClick={loadUserData} className="profile__retry-btn">
                        Try again
                    </button>
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="profile">

                <div className="profile__error">
                    Can't find user data!
                    <button onClick={loadUserData} className="profile__retry-btn">
                        Load again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="profile">
            <div className="profile__container">
                <Link to="/dashboard" className="login__back-button">
                    ← Back to Dashboard
                </Link>
                <h1 className="profile__title">My Profile</h1>

                <div className="profile-card">
                    <div className="profile-card__header">
                        <div className="avatar">
                            <div className="avatar__image">
                                <img src={User}  alt="userIcon"/>
                            </div>
                        </div>

                        <div className="profile-info">
                            <h2 className="profile-info__name">{userData.name}</h2>
                            <div className="profile-info__plan">
                                <span className={`plan-badge plan-badge--${userData.plan}`}>
                                    {userData.plan === 'free' && 'Free'}
                                    {userData.plan === 'pro' && 'PRO'}
                                    {userData.plan === 'business' && 'Business'}
                                </span>
                            </div>
                            <p className="profile-info__email">{userData.email}</p>
                        </div>
                    </div>

                    <div className="profile-details">
                        <div className="profile-details__item">
                            <label className="profile-details__label">Registration date</label>
                            <p className="profile-details__value">{userData.registrationDate}</p>
                        </div>
                        </div>
                    </div>

                    <div className="profile-card__actions">
                    </div>
                </div>
            </div>

    );
};

export default Profile;