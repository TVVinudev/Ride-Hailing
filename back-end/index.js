import express, { json } from 'express';
import dotenv from 'dotenv';
import { userRoutes } from './routes/userRoutes.js';
import { riderRoute } from './routes/riderRoutes.js';
import { passengerRoute } from './routes/passengersRoutes.js';
import { tripRoutes } from './routes/tripRoute.js';
import { paymentRoute } from './routes/paymentRoutes.js';
import { ratingRoutes } from './routes/ratingRoutes.js';




dotenv.config();



const app = express();

app.use(json());

app.use('/',userRoutes);
app.use('/rider',riderRoute);
app.use('/passenger',passengerRoute);
app.use('/trip',tripRoutes);
app.use('/payment',paymentRoute);
app.use('/rating',ratingRoutes)

const port = process.env.port;

app.listen(port,()=>{
    console.log(`server running ${port}`)
});
