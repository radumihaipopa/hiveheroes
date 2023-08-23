export interface Bee {
    health: number;
}

export interface BeeSwarm {
    queen: Bee;
    workers: Bee[];
    drones: Bee[];
    [key: string]: Bee | Bee[];
}

export enum BeeType {
    Queen = 'queen',
    Worker = 'worker',
    Drone = 'drone',
}