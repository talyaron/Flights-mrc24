import mysql from 'mysql2';
import dotenv from 'dotenv';


export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
}).promise();

export const testConnection = async () => {
    console.log("testConnection");
    try {
        const connection = await pool.getConnection();
        console.log('Database connected successfully');
        connection.release();
        return true;
    } catch (error:any) {
        console.error('Error connecting to the database:', error.message);
        return false;
    }
}

// Test the connection
testConnection();


export default pool;