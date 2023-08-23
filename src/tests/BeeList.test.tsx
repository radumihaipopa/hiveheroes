import React from 'react';
import { render, screen } from '@testing-library/react';
import BeeList from '../ui/BeeList';

const mockBeeSwarm = {
    queen: { health: 100 },
    workers: [{ health: 0 }],
    drones: [{ health: 50 }],
};

const mockBeeSwarm2 = {
    queen: { health: 0 },
    workers: [{ health: 0}, {health: 50}, {health: 0}, {health: 1}],
    drones: [{ health: 50 }],
};

describe('BeeList component', () => {
    it('renders only alive bees', () => {
        render(<BeeList beeSwarm={mockBeeSwarm} />);

        const aliveBeeElements = screen.queryAllByText(/Type: (Queen|Worker|Drone)/i);
        expect(aliveBeeElements.length).toBe(2); // 1 Queen and 1 drone are alive
    });

    it('renders only alive bees 2', () => {
        render(<BeeList beeSwarm={mockBeeSwarm2} />);

        const aliveBeeElements = screen.queryAllByText(/Type: (Queen|Worker|Drone)/i);
        expect(aliveBeeElements.length).toBe(3); // 2 workers and 1 drone are alive
    });
});