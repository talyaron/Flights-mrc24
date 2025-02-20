import express from 'express'
import { testConnection } from './db'
const app = express()
const port = 3000

app.get('/', (req:any, res:any) => {
  res.send('Hello World!')
})

testConnection();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})