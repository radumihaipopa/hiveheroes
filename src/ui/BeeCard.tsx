import React from 'react';
import { BeeType } from '../types';

interface BeeCardProps {
    type: BeeType;
    index: number;
    health: number;
}

const BeeCard: React.FC<BeeCardProps> = React.memo(({ type, index , health }) => {
    const getImagePath = (): string => {
        switch (type) {
            case 'queen':
                return require('../assets/queen-bee-image.png');
            case 'worker':
                return require('../assets/worker-bee-image.png');
            case 'drone':
                return require('../assets/drone-bee-image.png');
            default:
                return '';
        }
    };

    return (
        <div className={`bee-card ${type}`} key={`${type}-${index}`}>
            <img className="bee-image" src={getImagePath()} alt={`${type} Bee`} />
            <div className="bee-info">
                <p>Type: {type}</p>
                <p>Health: {health} HP</p>
            </div>
        </div>
    );
});

export default BeeCard;