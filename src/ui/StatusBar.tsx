import React from 'react';

interface StatusBarProps {
    playerName: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ playerName }) => (
    <div className="status-bar">
        <p>Player: {playerName}</p>
    </div>
);

export default StatusBar;