import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusBar from '../ui/StatusBar';

describe('StatusBar component', () => {
    it('renders player name', () => {
        const playerName = 'Bee Killer';
        render(<StatusBar playerName={playerName} />);
        const playerNameElement = screen.getByText(/Player: Bee Killer/i);
        expect(playerNameElement).toBeInTheDocument();
    });

});