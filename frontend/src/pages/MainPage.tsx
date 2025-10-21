import React from "react";
import NavbarMain from "../components/NavbarMain";
import MoneyImage from "../assets/images/money.jpg";
import AdvantageCard from "../components/AdvantageCard";
import PriceCard from "../components/PriceCard";
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";

const prices = [
    {
        title: 'Trial',
        description: 'Try it for free for a month',
    },
    {
        title: 'Standard',
        description: 'Usual subscription',
    },
];

const advantages = [
    {
        title: "Fast Start",
        description: "Launch your project in a few minutes.",
    },
    {
        title: "Security",
        description: "Your data is securely protected.",
    },
    {
        title: "Community",
        description: "Thousands of satisfied users.",
    }
];

const MainPage = () => {
    return (
        <main className="main-page">
            <NavbarMain/>
            <section id="hero" className="main-page__hero" aria-labelledby="hero-title">
                <div className="main-page__hero-content">
                    <h1 id="hero-title" className="main-page__hero-title">
                        The best service for budget saving
                    </h1>
                    <p className="main-page__hero-subtitle">
                        Control your money easily and simplify money management
                    </p>
                    <Link to="/login">
                    <button className="main-page__button button">Get started</button>
                    </Link>
                </div>
                <div className="main-page__hero-image">
                    <img src={MoneyImage} alt="Money management illustration" />
                </div>
            </section>


            <section id="why-us" className="main-page__features" aria-labelledby="features-title">
                <div className="main-page__features-container">
                    <h2 id="features-title" className="main-page__features-title">
                        Our advantages
                    </h2>
                    <div className="main-page__features-grid">
                        {advantages.map((item, index) => (
                            <AdvantageCard
                                key={index}
                                title={item.title}
                                description={item.description}
                            />
                        ))}
                    </div>
                </div>
            </section>


            <section id="pricing" className="main-page__pricing" aria-labelledby="pricing-title">
                <div className="main-page__pricing-container">
                    <h2 id="pricing-title" className="main-page__pricing-title">
                        Pricing plans
                    </h2>
                    <div className="main-page__pricing-grid">
                        {prices.map((item, index) => (
                            <PriceCard
                                key={index}
                                title={item.title}
                                description={item.description}
                            />
                        ))}
                    </div>
                </div>
            </section>


            <footer id="contacts" className="main-page__footer" aria-labelledby="footer-title">
                <h2 id="footer-title" className="main-page__footer-title">
                    Contact us
                </h2>

            </footer>
        </main>
    );
};

export default MainPage;