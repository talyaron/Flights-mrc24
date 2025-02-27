import mysql from "mysql2";
import {config} from 'dotenv';
config();

const password = process.env.MYSQL_PASSWORD;


const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: password,
    database: "flights", 
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
  })
  .promise();



export default pool;
