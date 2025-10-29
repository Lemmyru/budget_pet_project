import React from 'react';
import { Link } from 'react-router-dom';

interface PriceCardProps {
    title: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    popular?: boolean;
    buttonText: string;
}

const PriceCard: React.FC<PriceCardProps> = ({
                                                 title,
                                                 price,
                                                 period,
                                                 description,
                                                 features,
                                                 popular = false,
                                                 buttonText
                                             }) => {
    return (
        <div className={`price-card ${popular ? 'price-card--popular' : ''}`}>
            {popular && <div className="price-card__badge">Most Popular</div>}

            <div className="price-card__header">
                <h3 className="price-card__title">{title}</h3>
                <div className="price-card__price">
                    <span className="price-card__amount">{price}</span>
                    <span className="price-card__period">{period}</span>
                </div>
                <p className="price-card__description">{description}</p>
            </div>

            <div className="price-card__features">
                <ul className="price-card__features-list">
                    {features.map((feature, index) => (
                        <li key={index} className="price-card__feature">
                            ✓ {feature}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="price-card__actions">
                <Link to="/login">
                    <button className={`price-card__button ${popular ? 'price-card__button--primary' : ''}`}>
                        {buttonText}
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PriceCard;