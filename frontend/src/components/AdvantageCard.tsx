import React, {ReactNode, FC} from 'react';

interface AdvantageCardProps {
    title: string;
    description: string;
    image?: ReactNode;
}

const AdvantageCard: FC<AdvantageCardProps> = ({title, description, image}) => {
    return (
        <div className="advantage-card">
            <h5 className="advantage-card__title">{title}</h5>
            <p className="advantage-card__description">{description}</p>
            {image && <div className="advantage-card__image">{image}</div>}
        </div>
    );
};

export default AdvantageCard;