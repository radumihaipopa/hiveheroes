import React from 'react';
import BeeCard from './BeeCard';
import { BeeType, BeeSwarm } from '../types';

interface BeeListProps {
    beeSwarm: BeeSwarm;
}

const BeeList: React.FC<BeeListProps> = ({ beeSwarm }) => {
    const aliveBees: { type: BeeType; index?: number; health?: number }[] = [];

    if (beeSwarm.queen.health > 0) {
        aliveBees.push({ type: BeeType.Queen, index: -1, health: beeSwarm?.queen?.health });
    }

    beeSwarm.workers.forEach((worker: { health: number }, index: number) => {
        if (worker.health > 0) {
            aliveBees.push({ type: BeeType.Worker, index, health: worker.health });
        }
    });

    beeSwarm.drones.forEach((drone: { health: number }, index: number) => {
        if (drone.health > 0) {
            aliveBees.push({ type: BeeType.Drone, index, health: drone.health });
        }
    });

    if (aliveBees.length === 0) {
        return null;
    }

    return (
        <div className="bee-list">
            {aliveBees.map(bee => (
                <BeeCard
                    key={`${bee.type}-${bee.index}`}
                    type={bee.type}
                    index={bee.index || -1}
                    health={bee.health || -1}
                />
            ))}
        </div>
    );
};

export default BeeList;