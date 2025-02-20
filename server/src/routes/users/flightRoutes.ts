import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Create MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

// Connect to Database
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1); // Exit if connection fails
    }
    console.log("✅ Connected to MySQL Database");
});

// 🔹 GET /flights - Fetch flights by date (if provided)
router.get("/flights", (req, res) => {
    const { date } = req.query;
    let query = "SELECT * FROM Flights";
    let params: any[] = [];

    if (date) {
        query += " WHERE departure_date = ?";
        params.push(date);
    }

    db.query(query, params, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Database query failed" });
        } else {
            res.json(result);
        }
    });
});

// 🔹 POST /flights - Add a new flight
router.post("/flights", (req: any, res: any) => {
    const { airline, departure, arrival, departure_date, departure_time, arrival_time, price, origin, destination } = req.body;

    if (!airline || !departure || !arrival || !departure_date || !departure_time || !arrival_time || !price || !origin || !destination) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = `
        INSERT INTO Flights (airline, departure, arrival, departure_date, departure_time, arrival_time, price, origin, destination) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    db.query(sql, [airline, departure, arrival, departure_date, departure_time, arrival_time, price, origin, destination], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to add flight" });
        } else {
            res.json({ message: "Flight added successfully" });
        }
    });
});

export default router;
