import express from 'express'
import pool from './db'
import usersRouter from './routes/users/usersRouters';
import adminRouter from './routes/sysAdmin/adminRouter';
import cors from 'cors';
const app = express()
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

pool.getConnection()
const apiRouter = express.Router();
apiRouter.use("/users", usersRouter);
apiRouter.use("/admin", adminRouter);

app.use("/api", apiRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})