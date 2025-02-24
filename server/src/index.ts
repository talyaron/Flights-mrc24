import express from 'express'
import pool from './db'
import usersRouter from './routes/users/usersRouter';
import adminRouter from './routes/sysAdmin/adminRouter';
const app = express()
const port = 3000

app.get('/', (req:any, res:any) => {
  res.send('Hello World!')
})

pool.getConnection()
const apiRouter = express.Router();
apiRouter.use("/users", usersRouter);
apiRouter.use("/admin", adminRouter);

app.use("/api", apiRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})