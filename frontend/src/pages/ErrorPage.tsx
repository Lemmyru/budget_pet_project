import React from 'react';
import { Link } from 'react-router-dom';
import Ghost from "../assets/images/ghost.png";

const NotFound = () => {
    return (
        <div className="notFound">
            <div className="notFound__container">
                <div className="notFound__content">
                    <h1 className="notFound__error-code">Error</h1>
                    <h3 className="notFound__title">You have to be authorized to see this page.</h3>
                    <Link to="/" className="notFound__button">
                        Back to the main page
                    </Link>
                    <Link to="/login" className="notFound__button">
                        Login
                    </Link>
                </div>

                <div className="notFound__image">
                    <img src={Ghost} alt="Ghost illustration for 404 error" />
                </div>
            </div>
        </div>
    );
};

export default NotFound;