export interface Flight {
    id?: string; // Assuming MongoDB ObjectId is a string
    departure_date: Date;
    departure_time: string;
    arrival_time: string;
    price: number;
    origin: string;
    destination: string;
    airplane_id: number;
    status?: 'scheduled' | 'delayed' | 'cancelled' | 'completed';
}

export default Flight;