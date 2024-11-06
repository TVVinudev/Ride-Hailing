import { Router } from "express";
import { Passengers, Rider, User } from "../models/db.js";
import { authenticate } from "../middleware/auth.js";


const passengerRoute = Router();

passengerRoute.post('/add', async (req, res) => {
    const body = req.body;

    const {
        tripId,
        userName,
        pickupLocation,
        dropLocation,
        numberPassenger,
        coPassengers

    } = body;
    try {
        const result = await User.findOne({ userName: userName });
        const verification = await Rider.findOne({ tripId: tripId })
        if (result && verification) {
            const newData = new Passengers({

                tripId: tripId,
                userName: userName,
                pickupLocation: pickupLocation,
                dropLocation: dropLocation,
                numberPassenger: numberPassenger,
                coPassengers: coPassengers
            });

            await newData.save();
            res.status(201).json({ message: " Passengers Added " });
        } else {
            res.status(404).json({ message: "user already exist" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "server error!" })
    }

});


passengerRoute.delete('/delete/:id', authenticate, async (req, res) => {
    try {
        const cid = req.params.id;

        if (req.UserRole === 'admin') {
            const result = await Passengers.findOne({ tripId: cid })
            if (result) {
                const result = await Passengers.deleteOne({ tripId: cid });
                console.log(`${result.deletedCount} document(s) was/were deleted.`);
                res.status(200).json({ message: "Delete Successfully" })
            } else {
                res.status(404).json({ message: "User not found" })
            }
        } else {
            res.status(404).json({ message: 'you are not admin' })
        }

    } catch (error) {
        console.log(error)
    }
})

passengerRoute.get('/viewAll', authenticate, async (req, res) => {
    try {

        if (req.UserRole == 'admin') {
            const ridersData = await Passengers.find();
            res.send(ridersData);
        } else {
            res.status(404).json({ message: "you are not admin" })
        }

    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
});

passengerRoute.get('/search/:search', authenticate, async (req, res) => {

    try {
        const search = req.params.search;
        const result = await Passengers.find({ userName: search })
        if (result) {
            res.status(200).json({ data: result })
        } else {
            res.status(404).json({ message: "user not found" })
        }


    } catch (err) {
        res.status(500).json({ message: "server error", data: err })

    }
});





export { passengerRoute };