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


export default pool;
