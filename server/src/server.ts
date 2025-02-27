import express from 'express'
import pool from './db'
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import usersRouter from "./routes/users/usersRouters";
import flightsRouter from './routes/flights/flightsRouter';



const app = express()
const port = 3000;

//middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"], // Your React app origin
    credentials: true, // Allow cookies to be sent with requests
  })
);

// 🔹 Test Connection
pool.getConnection()
  .then(() => console.log("✅ Connected to MySQL Database"))
  .catch((err) => console.error("❌ MySQL Connection Error:", err));

const apiRouter = express.Router();
apiRouter.use("/users", usersRouter);
apiRouter.use("/flights", flightsRouter);

app.use("/api", apiRouter);

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
