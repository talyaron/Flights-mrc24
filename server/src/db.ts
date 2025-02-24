import mysql from "mysql2";
import { config } from "dotenv";
config();


const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "flights", 
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
  })
  .promise();
  const testConnection = async () => {
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

testConnection();


export default pool;
