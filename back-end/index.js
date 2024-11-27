import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


import { userRoutes } from './routes/userRoutes.js';
import { riderRoute } from './routes/riderRoutes.js';
import { MakeTrip } from './routes/makeTripRoutes.js';
import { passengerRoutes } from './routes/Passengers.js';
import { tripRoutes } from './routes/Trip.js';
import { paymentRoute } from './routes/payment.js';




dotenv.config();
const app = express();

app.use(
    cors({
      origin: "http://localhost:8040",
      credentials: true
    })
  );
  
app.use(json());

app.use('/',userRoutes);
app.use('/rider',riderRoute);
app.use('/trip',MakeTrip);
app.use('/passenger',passengerRoutes);
app.use('/tripInitial',tripRoutes);
app.use('/payment',paymentRoute);
// app.use('/rating',ratingRoutes)

const port = process.env.port;

app.listen(port,()=>{
    console.log(`server running ${port}`)
});
