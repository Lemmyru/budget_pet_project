import React from 'react';
import rocketIcon from '../assets/images/rocket.png';
import calendarIcon from '../assets/images/calendar.png';
import timeIcon from '../assets/images/time.png';

interface AdvantageCardProps {
    title: string;
    description: string;
    icon: string;
}

const iconMap: { [key: string]: string } = {
    rocket: rocketIcon,
    time: timeIcon,
    calendar: calendarIcon
};

const AdvantageCard: React.FC<AdvantageCardProps> = ({ title, description, icon }) => {
    return (
        <div className="advantage-card">
            <div className="advantage-card__icon">
                <img
                    src={iconMap[icon]}
                    alt={title}
                    className="advantage-card__icon-img"
                />
            </div>
            <h3 className="advantage-card__title">{title}</h3>
            <p className="advantage-card__description">{description}</p>
        </div>
    );
};

export default AdvantageCard;