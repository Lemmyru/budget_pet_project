import React, {ReactNode, FC} from 'react';


interface PriceCardProps {
    title: string;
    description: string;
}

const PriceCard:FC<PriceCardProps> = ({title, description}) => {
    return (
        <div className="advantage-card">
            <h5 className="advantage-card__title">{title}</h5>
            <p className="advantage-card__description">{description}</p>
        </div>
    );
};

export default PriceCard;