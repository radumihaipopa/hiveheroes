import React, { useState, useEffect } from 'react';
import './App.css';
import BeeList from './ui/BeeList';
import GameEngine from './gameplay/GameEngine';
import StatusBar from './ui/StatusBar';
import { BeeSwarm } from './types';

const STORAGE_KEY = 'beeGame';

const generateDefaultBeeSwarm = (): BeeSwarm => {
    return {
        queen: { health: 100 },
        workers: Array(5).fill(null).map(() => ({ health: 75 })),
        drones: Array(8).fill(null).map(() => ({ health: 50 })),
    };
};

const App: React.FC = () => {
    const [beeSwarm, setBeeSwarm] = useState<BeeSwarm>(generateDefaultBeeSwarm());
    const playerName = 'Bee Killer';

    useEffect(() => {
        const storedGame = localStorage.getItem(STORAGE_KEY);
        if (storedGame) {
            setBeeSwarm(JSON.parse(storedGame));
        } else {
            setBeeSwarm(generateDefaultBeeSwarm());
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(beeSwarm));
    }, [beeSwarm]);

    const handleResetGame = () => {
        localStorage.removeItem(STORAGE_KEY);
        setBeeSwarm(generateDefaultBeeSwarm());
    };

    return (
        <div className="app">
            <header className="header">
                <h1>🐝 The Hive Heroes 🐝</h1>
            </header>
            <main className="content">
                <BeeList beeSwarm={beeSwarm} />
                <GameEngine beeSwarm={beeSwarm} setBeeSwarm={setBeeSwarm} onReset={handleResetGame} />
            </main>
            <footer className="footer">
                <StatusBar playerName={playerName} />
            </footer>
        </div>
    );
};

export default App;