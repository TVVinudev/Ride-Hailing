import express, { json } from 'express';
import dotenv from 'dotenv';


dotenv.config();



const app = express();

app.use(json());

const port = process.env.port;

app.listen(port,()=>{
    console.log(`server running ${port}`)
})
