import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GameEngine, {calculateDamage} from '../gameplay/GameEngine';

const mockBeeSwarm = {
    queen: { health: 100 },
    workers: [{ health: 75 }, { health: 0 }],
    drones: [{ health: 50 }],
};

describe('GameEngine component', () => {
    it('triggers button and awaits hit notification', async () => {
        render(<GameEngine beeSwarm={mockBeeSwarm} setBeeSwarm={jest.fn()} onReset={jest.fn()} />);

        const hitButtonElement = screen.getByText(/Hit a bee/i);
        fireEvent.click(hitButtonElement);

        // Wait for the hit notification to appear and fade out
        await waitFor(() => {
            const hitNotificationElement = screen.queryByText(/Hit: (Queen|Worker|Drone), Damage: \d+/i);
            expect(hitNotificationElement).toBeNull();
        });
    });

    it('calculates damage for queen', () => {
        const damage = calculateDamage('queen');
        expect(damage).toEqual(8);
    });

    it('calculates damage for worker', () => {
        const damage = calculateDamage('worker');
        expect(damage).toEqual(10);
    });

    it('calculates damage for drone', () => {
        const damage = calculateDamage('drone');
        expect(damage).toEqual(12);
    });

    it('calculates damage for unknown bee type', () => {
        const damage = calculateDamage('unknown');
        expect(damage).toEqual(0);
    });

});