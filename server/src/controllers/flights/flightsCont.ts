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

export const searchFlightsByDate = async (req: any, res: any) => {
    try {
        const { ddate } = req.query;

        if (!ddate) {
            return res.status(400).json({
                status: "error",
                message: "Please provide a departure date"
            });
        }

        console.log("Departure Date:", ddate);

        const query = `
            SELECT 
                f.flight_id,
                f.departure_date,
                f.departure_time,
                f.arrival_time,
                f.price,
                f.origin,
                f.destination,
                a.model AS airplane_model,
                fc.name AS company_name
            FROM Flight f
            JOIN Airplane a ON f.airplane_id = a.airplane_id
            JOIN Flight_Company fc ON a.company_id = fc.company_id
            WHERE DATE(f.departure_date) = ?
            ORDER BY f.departure_time;
        `;

        const [flights] = await pool.query<Flight[]>(query, [ddate]);

        console.log(flights);

        res.status(200).json({
            status: "success",
            flights
        });
    } catch (error) {
        console.error("Error searching flights by date:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to fetch flights"
        });
    }
};



export const getAllFlights = async (req: Request, res: Response) => {
    try {
        const { ddate, adate } = req.query;

        console.log("Query Params:", req.query); // Debugging

        // Base SQL query
        let query = `
            SELECT 
                f.flight_id,
                f.departure_date,
                f.departure_time,
                f.arrival_time,
                f.price,
                f.origin,
                f.destination,
                a.model AS airplane_model,
                fc.name AS company_name
            FROM Flight f
            JOIN Airplane a ON f.airplane_id = a.airplane_id
            JOIN Flight_Company fc ON a.company_id = fc.company_id
        `;

        let queryParams: any[] = [];
        let conditions: string[] = [];

        // 🔹 Strictly filter by departure date
        if (ddate) {
            conditions.push("DATE(f.departure_date) = ?");
            queryParams.push(ddate);
        }

        // 🔹 Strictly filter by arrival date
        if (adate) {
            conditions.push("DATE(f.arrival_time) = ?");
            queryParams.push(adate);
        }

        // Apply WHERE clause if conditions exist
        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        query += " ORDER BY f.departure_date, f.departure_time";

        console.log("Final Query:", query); // Debugging
        console.log("Query Params:", queryParams); // Debugging

        // Execute the query
        const [flights] = await pool.query<Flight[]>(query, queryParams);

        res.status(200).json({
            status: "success",
            flights
        });
    } catch (error) {
        console.error("Error fetching flights:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to fetch flights"
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

