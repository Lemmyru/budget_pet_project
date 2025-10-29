import React from "react";
import NavbarMain from "../components/NavbarMain";
import MoneyImage from "../assets/images/money.jpg";
import AdvantageCard from "../components/AdvantageCard";
import PriceCard from "../components/PriceCard";
import { Link } from "react-router-dom";


interface PricePlan {
    title: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    popular: boolean;
    buttonText: string;
}

interface Advantage {
    title: string;
    description: string;
    icon: string;
}

interface Stat {
    number: string;
    label: string;
}

const prices: PricePlan[] = [
    {
        title: 'Starter',
        price: 'Free',
        period: 'forever',
        description: 'Perfect for personal budgeting',
        features: ['Up to 3 projects', 'Basic analytics', 'Email support', '1GB storage', 'Mobile app access'],
        popular: false,
        buttonText: 'Get Started'
    },
    {
        title: 'Pro',
        price: '$9',
        period: 'month',
        description: 'Ideal for serious budgeters',
        features: ['Unlimited projects', 'Advanced analytics', 'Priority support', '10GB storage', 'Export reports', 'Custom categories'],
        popular: true,
        buttonText: 'Start Free Trial'
    },
    {
        title: 'Business',
        price: '$24',
        period: 'month',
        description: 'For teams and families',
        features: ['Everything in Pro', 'Team collaboration', 'Advanced reports', '50GB storage', 'API access', 'Dedicated manager'],
        popular: false,
        buttonText: 'Contact Sales'
    }
];

const advantages: Advantage[] = [
    {
        title: "Smart Automation",
        description: "Automatic categorization and smart suggestions save you hours each month",
        icon: "rocket"
    },
    {
        title: "Real-time Sync",
        description: "Your data syncs instantly across all devices, always up to date",
        icon: "calendar"
    },
    {
        title: "24/7 Support",
        description: "Expert help whenever you need it, day or night",
        icon: "time"
    }
];
const stats: Stat[] = [
    { number: "50K+", label: "Happy Users" },
    { number: "$2.1M+", label: "Saved Monthly" },
    { number: "4.9/5", label: "Rating" },
    { number: "99.9%", label: "Uptime" }
];

const MainPage: React.FC = () => {
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


            <section className="main-page__stats">
                <div className="main-page__stats-container">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-card">
                            <div className="stat-card__number">{stat.number}</div>
                            <div className="stat-card__label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>


            <section id="why-us" className="main-page__features">
                <div className="main-page__features-container">
                    <div className="main-page__features-header">
                        <h2 className="main-page__features-title">
                            Everything you need to master your budget
                        </h2>
                        <p className="main-page__features-subtitle">
                            Powerful features designed to help you save more, stress less, and achieve your financial goals faster.
                        </p>
                    </div>
                    <div className="main-page__features-grid">
                        {advantages.map((item, index) => (
                            <AdvantageCard
                                key={index}
                                title={item.title}
                                description={item.description}
                                icon={item.icon}
                            />
                        ))}
                    </div>
                </div>
            </section>


            <section id="pricing" className="main-page__pricing" aria-labelledby="pricing-title">
                <div className="main-page__pricing-container">
                    <div className="main-page__pricing-header">
                        <h2 id="pricing-title" className="main-page__pricing-title">
                            Choose Your Plan
                        </h2>
                        <p className="main-page__pricing-subtitle">
                            Start for free, upgrade as you grow. No hidden fees.
                        </p>
                    </div>
                    <div className="main-page__pricing-grid">
                        {prices.map((plan, index) => (
                            <PriceCard
                                key={index}
                                title={plan.title}
                                price={plan.price}
                                period={plan.period}
                                description={plan.description}
                                features={plan.features}
                                popular={plan.popular}
                                buttonText={plan.buttonText}
                            />
                        ))}
                    </div>
                </div>
            </section>


            <section className="main-page__cta">
                <div className="main-page__cta-container">
                    <h2 className="main-page__cta-title">
                        Ready to transform your financial life?
                    </h2>
                    <p className="main-page__cta-subtitle">
                        Join thousands of users who have already saved millions and achieved their financial dreams.
                    </p>
                    <div className="main-page__cta-buttons">
                        <Link to="/signup">
                            <button className="button button--primary button--large">
                                Start Free Trial
                            </button>
                        </Link>
                    </div>
                </div>
            </section>


            <footer className="main-page__footer">
                <div className="main-page__footer-container">
                    <div className="main-page__footer-content">
                        <div className="main-page__footer-info">
                            <h3 className="main-page__footer-title">Simple Budget</h3>
                            <p className="main-page__footer-description">
                                Making financial freedom accessible to everyone.
                            </p>
                        </div>
                        <div className="main-page__footer-links">
                            <div className="main-page__footer-column">
                                <h4>Product</h4>
                                <a href="#why-us">why us</a>
                                <a href="#pricing">pricing</a>
                                <a href="#contacts">contacts</a>
                            </div>
                            <div className="main-page__footer-column">
                                <h4>Let's start</h4>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Registration</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
};

export default MainPage;