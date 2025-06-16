export interface Trip {
    id: number;
    destination: string;
    startDate: Date;
    endDate: Date;
    description: string;
    userId: number; // FK
}