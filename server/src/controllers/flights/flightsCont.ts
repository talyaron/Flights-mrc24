import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import pool from "../../db";

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
        message: "Please provide a departure date",
      });
    }

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

    res.status(200).json({
      status: "success",
      flights,
    });
  } catch (error) {
    console.error("Error searching flights by date:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch flights",
    });
  }
};

export const getAllFlights = async (req: Request, res: Response) => {
  try {
    const { ddate, adate } = req.query;

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

    // Execute the query
    const [flights] = await pool.query<Flight[]>(query, queryParams);

    res.status(200).json({
      status: "success",
      flights,
    });
  } catch (error) {
    console.error("Error fetching flights:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch flights",
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
      airplane_id,
    } = req.body;
    console.log(req.body)

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
      [
        airplane_id,
        departure_date,
        departure_time,
        arrival_time,
        price,
        origin,
        destination,
      ]
    );

    res.status(201).json({
      status: "success",
      message: "Flight added successfully",
    });
  } catch (error) {
    console.error("Error adding flight:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to add flight",
    });
  }
};

// ✅ Delete Flight
export const deleteFlight = async (req: any, res: any) => {
  try {
    const { flightId } = req.params;

    if (!flightId) {
      return res
        .status(400)
        .json({ status: "error", message: "Flight ID is required" });
    }

    const [result] = await pool.query(
      `DELETE FROM Flight WHERE flight_id = ?`,
      [flightId]
    );

    if ((result as any).affectedRows === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Flight not found" });
    }

    res
      .status(200)
      .json({ status: "success", message: "Flight deleted successfully" });
  } catch (error) {
    console.error("Error deleting flight:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to delete flight" });
  }
};

// ✅ Update Flight
export const updateFlight = async (req: any, res: any) => {
  try {
    const { flightId } = req.params;
    const {
      departure_date,
      departure_time,
      arrival_time,
      price,
      origin,
      destination,
      airplane_id,
    } = req.body;

    if (!flightId) {
      return res
        .status(400)
        .json({ status: "error", message: "Flight ID is required" });
    }

    await pool.query(
      `UPDATE Flight SET
                airplane_id = ?,
                departure_date = ?,
                departure_time = ?,
                arrival_time = ?,
                price = ?,
                origin = ?,
                destination = ?
            WHERE flight_id = ?`,
      [
        airplane_id,
        departure_date,
        departure_time,
        arrival_time,
        price,
        origin,
        destination,
        flightId,
      ]
    );

    res
      .status(200)
      .json({ status: "success", message: "Flight updated successfully" });
  } catch (error) {
    console.error("Error updating flight:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to update flight" });
  }
};

// ✅ Update All Flights
export const updateAllFlights = async (req: Request, res: Response) => {
  try {
    const {
      departure_date,
      departure_time,
      arrival_time,
      price,
      origin,
      destination,
      airplane_id,
    } = req.body;

    await pool.query(
      `UPDATE Flight SET
                airplane_id = ?,
                departure_date = ?,
                departure_time = ?,
                arrival_time = ?,
                price = ?,
                origin = ?,
                destination = ?`,
      [
        airplane_id,
        departure_date,
        departure_time,
        arrival_time,
        price,
        origin,
        destination,
      ]
    );

    res
      .status(200)
      .json({ status: "success", message: "All flights updated successfully" });
  } catch (error) {
    console.error("Error updating all flights:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to update flights" });
  }
};

export const filterFlights = async (req: Request, res: Response) => {
  const { from, to, departDate } = req.query;

  try {
    const [flights] = await pool.execute(
      `
            SELECT
                f.flight_id,
                f.departure_date,
                f.departure_time,
                f.arrival_time,
                f.price,
                f.origin,
                f.destination,
                a.model,
                c.name AS company_name
            FROM flight f
            LEFT JOIN airplane a ON f.airplane_id = a.airplane_id
             LEFT JOIN flight_company c ON a.company_id = c.company_id
            WHERE f.origin = ?
            AND f.destination = ?
            AND f.departure_date >= ?
        `,
      [from, to, departDate]
    );
    res.json(flights);
  } catch (error) {
    console.error("Search flights error:", error);
    res.status(500).json({
      message: "Error searching flights",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getFlightDestinations = async (req: Request, res: Response) => {
  try {
    const [destinations] = await pool.query<Flight[]>(`
            SELECT DISTINCT destination FROM Flight
        `);
    res.json(destinations);
  } catch (error) {
    console.error("Error fetching flight destinations:", error);
    res.status(500).json({
      message: "Error fetching flight destinations",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getFlightOrigin = async (req: Request, res: Response) => {
  try {
    const [origins] = await pool.query<Flight[]>(`
            SELECT DISTINCT origin FROM Flight
        `);
    res.json(origins);
  } catch (error) {
    console.error("Error fetching flight origins:", error);
    res.status(500).json({
      message: "Error fetching flight origins",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getFlightById = async (req: any, res: any) => {
  try {
    const { flightId } = req.params;

    console.log("Flight ID:", flightId);

    if (!flightId) {
      return res.status(400).json({
        status: "error",
        message: "Flight ID is required",
      });
    }

    const [data] = await pool.query<Flight[]>(
      `
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
            WHERE f.flight_id = ?
        `,
      [flightId]
    );

    const flight = data[0];

    if (!flight) {
      return res.status(404).json({
        status: "error",
        message: "Flight not found",
      });
    }

    res.status(200).json({
      flight,
    });
  } catch (error) {
    console.error("Error fetching flight by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch flight",
    });
  }
};
