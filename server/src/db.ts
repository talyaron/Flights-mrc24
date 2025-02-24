import mysql from 'mysql2';
import { config } from "dotenv";

config();
export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: 'root',
    password:'17march94',
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
  })
  .promise();
  export const testConnection = async () => {
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
