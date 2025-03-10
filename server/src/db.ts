
import mysql from 'mysql2';
import { config } from "dotenv";
config();

const password = process.env.MYSQL_PASSWORD;

export const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: password,
    database: "flights",
    port: 3306,
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
    } catch (error: any) {
        console.error('Error connecting to the database:', error.message);
        return false;
    }
}

// Test the connection
testConnection();



export default pool;
