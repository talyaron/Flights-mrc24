import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import pool from '../../db';


interface Flight extends RowDataPacket {
    flight_id: number;
    departure_date: Date;
    departure_time: string;
    arrival_time: string;
    price: number;
    origin: string;
    destination: string;
    airplane_model: string;
    company_name: string;
}

export const getAllFlights = async (req: Request, res: Response) => {
    try {
        const {ddate, adate} = req.query;
        
        console.log(ddate, adate);
        console.log(req.query);

        const [flights] = await pool.query<Flight[]>(`
            SELECT 
                f.flight_id,
                f.departure_date,
                f.departure_time,
                f.arrival_time,
                f.price,
                f.origin,
                f.destination,
                a.model as airplane_model,
                fc.name as company_name
            FROM Flight f
            JOIN Airplane a ON f.airplane_id = a.airplane_id
            JOIN Flight_Company fc ON a.company_id = fc.company_id
            ORDER BY f.departure_date, f.departure_time
        `);

        res.status(200).json({
            status: 'success',
            flights
        });
    } catch (error) {
        console.error('Error fetching flights:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch flights'
        });
    }
};

export const addFlight = async (req: Request, res: Response) => {
    try {
        const {
            departure_date,
            departure_time,
            arrival_time,
            price,
            origin,
            destination,
            airplane_id
        } = req.body;

        await pool.query(
            `INSERT INTO Flight (
                airplane_id,
                departure_date,
                departure_time,
                arrival_time,
                price,
                origin,
                destination
            ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [airplane_id, departure_date, departure_time, arrival_time, price, origin, destination]
        );

        res.status(201).json({
            status: 'success',
            message: 'Flight added successfully'
        });
    } catch (error) {
        console.error('Error adding flight:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to add flight'
        });
    }
};

