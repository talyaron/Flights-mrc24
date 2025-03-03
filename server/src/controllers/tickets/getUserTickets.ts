import { Request, Response } from "express";
import pool from "../../db"; 

export const getUserTickets = async (req: any, res: any) => {
  const { userId } = req.params; 

  try {
    const [tickets] = await pool.query(
      `SELECT t.ticket_id, t.purchase_date, t.seat_number, t.price, 
              f.flight_id, f.origin, f.destination, f.departure_date, f.departure_time, f.arrival_time
       FROM tickets t
       JOIN flights f ON t.flight_id = f.flight_id
       WHERE t.user_id = ?`,
      [userId]
    );

    if ((tickets as any).length === 0) {
      return res.status(404).json({ message: "No tickets found for this user" });
    }

    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching user tickets:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
