import React from 'react';
import { Link } from 'react-router-dom';
import Ghost from "../assets/images/ghost.png";

const NotFound = () => {
    return (
        <div className="notFound">
            <div className="notFound__container">
                <div className="notFound__content">
                    <h1 className="notFound__error-code">404</h1>
                    <h2 className="notFound__title">Page Not Found</h2>
                    <p className="notFound__description">
                        We can't seem to find the page that you're looking for.
                        It might have been moved or doesn't exist.
                    </p>
                    <Link to="/" className="notFound__button">
                        Back to the main page
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