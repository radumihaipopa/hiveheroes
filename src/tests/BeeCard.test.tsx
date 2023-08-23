import React from 'react';
import { render, screen } from '@testing-library/react';
import BeeCard from '../ui/BeeCard';
import { BeeType } from '../types';

describe('BeeCard component', () => {
    it('renders the bee card with type and health', () => {
        const props = {
            type: BeeType.Worker,
            index: 0,
            health: 75,
        };

        render(<BeeCard {...props} />);

        // Check if bee type and health are rendered
        expect(screen.getByText('Type: worker')).toBeInTheDocument();
        expect(screen.getByText('Health: 75 HP')).toBeInTheDocument();
    });
});