import React, { useState, useCallback } from 'react';
import Button from '../ui/Button';
import { Bee, BeeSwarm, BeeType } from '../types';

interface GameEngineProps {
    beeSwarm: BeeSwarm;
    setBeeSwarm: React.Dispatch<React.SetStateAction<BeeSwarm>>;
    onReset: () => void;
}

export const calculateDamage = (beeType: string): number => {
    switch (beeType) {
        case BeeType.Queen:
            return 8;
        case BeeType.Worker:
            return 10;
        case BeeType.Drone:
            return 12;
        default:
            return 0;
    }
};
const GameEngine: React.FC<GameEngineProps> = ({ beeSwarm, setBeeSwarm, onReset }) => {
    const [showGameOverNotification, setShowGameOverNotification] = useState(false);
    const [hitNotification, setHitNotification] = useState<string | null>(null);
    const [showHitNotification, setShowHitNotification] = useState(false);

    const setNotification = (beeType: BeeType, damage: number) => {
        // Set the notification content
        setHitNotification(`Hit: ${beeType}, Damage: ${damage}`);
        setShowHitNotification(true);

        // Clear the hit notification content after 900 ms
        setTimeout(() => {
            setHitNotification(null);
        }, 900);

        // Stop showing the notification after 700ms
        setTimeout(() => {
            setShowHitNotification(false);
        }, 800);
    }
    const handleHit = useCallback(() => {
        const beeTypes: BeeType[] = [BeeType.Queen, BeeType.Worker, BeeType.Drone];
        const randomBeeType = beeTypes[Math.floor(Math.random() * beeTypes.length)];
        const damage = calculateDamage(randomBeeType);
        const updatedBeeSwarm = { ...beeSwarm };



        if (randomBeeType === BeeType.Queen) {
            updatedBeeSwarm.queen.health -= damage;
            setNotification(randomBeeType, damage);
            // Queen's health reached zero, all bees died, we reset the game and show the game over notification
            if (updatedBeeSwarm.queen.health <= 0) {
                updatedBeeSwarm.workers.forEach(worker => (worker.health = 0));
                updatedBeeSwarm.drones.forEach(drone => (drone.health = 0));
                setBeeSwarm(updatedBeeSwarm);
                setShowGameOverNotification(true);
                setTimeout(() => {
                    setShowGameOverNotification(false);
                    onReset();
                }, 3000);
                return;
            }
        } else {
            // Select a random alive bee from the other 2 types and hit one
            const beeTypeKey = randomBeeType.toLowerCase() + 's';
            const beeArray = updatedBeeSwarm[beeTypeKey] as Bee[];
            const aliveBees = beeArray.filter(bee => bee.health > 0);

            if (aliveBees.length > 0) {
                const beeIndex = Math.floor(Math.random() * aliveBees.length);
                aliveBees[beeIndex].health -= damage;
                setNotification(randomBeeType, damage);
                // case when there are no alive bees of the type, so we roll again the RNG
            } else {
                handleHit();
                return;
            }

        }
        setBeeSwarm(updatedBeeSwarm);
    }, [beeSwarm, setBeeSwarm, onReset]);

    return (
        <div className="game-engine">
            {!showGameOverNotification && <Button label="Hit a bee" onClick={handleHit} disabled={showHitNotification}/>}
            {hitNotification && <div className={`hit-notification ${showHitNotification ? 'fade-in' : 'fade-out'}`}>
                {hitNotification}
            </div>}
            {showGameOverNotification && <p className="game-over">All bees are defeated! Restarting the game ... </p>}
        </div>
    );
};

export default GameEngine;


