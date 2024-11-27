import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { Passenger } from "../models/db.js";


const passengerRoutes = Router();

passengerRoutes.post('/addDetails', authenticate, async (req, res) => {
    const { pickup, dropoff, date, count, names } = req.body;
    const user = req.UserName;

    try {
        const newData = new Passenger({
            userName: user,
            pickupLocation: pickup,
            dropLocation: dropoff,
            bookedSeats: count,
            date,
            passengersName: names,
            // tripId: req.body.tripId || new mongoose.Types.ObjectId() // Ensure tripId is unique
        });

        await newData.save();
        res.status(200).json({ message: "Passenger data added successfully!" });
    } catch (error) {
        console.error('Error saving Passenger data:', error);
        res.status(500).json({ error: error.message });
    }
});


passengerRoutes.get('/viewAll', authenticate, async (req, res) => {

    try {

        if (req.UserRole === 'admin') {
            const userData = await Passenger.find();
            res.status(200).json({ message: "Success", data: userData })
        } else {
            res.status(404).json({ message: "you are not an Admin" })
        }

    } catch (error) {
        res.status(500).json({ message: "Server isssue" })
    }

});

passengerRoutes.get('/search/:username', authenticate, async (req, res) => {

    try {

        const search = req.params.username;

        const result = await Passenger.find({ userName: search })
        if (result) {
            res.status(200).json({ data: result })
        } else {
            res.status(404).json({ message: "user not found" })
        }

    } catch (err) {
        console.log(err);

    }
});

passengerRoutes.delete('/deleteTrip/:id', authenticate, async (req, res) => {

    const id = req.params.id

    if (req.UserRole == 'admin' || req.UserRole === 'user') {

        try {
            await Passenger.deleteOne({ userName: id })
            res.status(200).json({ Message: 'Delete successfully' })
        } catch (error) {
            console.error(error);

        }
    } else {
        res.status(404).json9 / { message: "not allowed to this function!" }
    }

});





export { passengerRoutes }