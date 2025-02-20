import mysql from 'mysql2';
import { CLIENT_RENEG_LIMIT } from 'tls';

export const pool = mysql.createPool({
    host: 'localhost',     
    user: 'root',         
    password: '17march94',          
    database: 'flights',  // Replace with your database name
    port: 3306,           
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