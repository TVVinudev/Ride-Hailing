import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { Passengers, Rider, Trip } from "../models/db.js";

const tripRoutes = Router();

tripRoutes.post('/add', authenticate, async (req, res) => {

    const body = req.body;

    const {
        tripId,
        riderName,
        passengersName,
        pickupLocation,
        dropLocation,
        status,
        distance
    } = body;

    console.log(tripId, riderName, passengersName, pickupLocation, dropLocation, status, distance);

    if (req.UserRole === 'admin') {

        const value = await Trip.findOne({ tripId: tripId });

        if (value) {
            res.status(409).json({ message: "Already exist" });
        } else {
            const newData = new Trip({
                tripId: tripId,
                riderName: riderName,
                passengersName: passengersName,
                pickupLocation: pickupLocation,
                dropLocation: dropLocation,
                status: status,
                distance: distance
            });

            console.log(newData)
            await newData.save();
            res.status(201).json({ message: "Ride registered" })

        }

    } else {
        res.status(404).json({ message: "not a valid user" })
    }


});



tripRoutes.get('/viewAll', authenticate, async (req, res) => {
    try {

        if (req.UserRole == 'admin') {
            const ridersData = await Trip.find();
            res.send(ridersData);
        } else {
            res.status(404).json({ message: "you are not admin" })
        }

    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
});

tripRoutes.get('/search/:search', authenticate, async (req, res) => {

    try {
        const search = req.params.search;

        if (req.UserRole === 'admin') {


            const result = await Trip.find({ tripId: search })
            if (result) {
                res.status(200).json({ data: result })
            } else {
                res.status(404).json({ message: "user not found" })
            }
        } else {
            res.status(404).json({ message: "you are not admin" })
        }

    } catch (err) {
        res.status(500).json({ message: "server error", data: err })

    }
});

tripRoutes.delete('/delete/:id', authenticate, async (req, res) => {
    try {
        const cid = req.params.id;

        if (req.UserRole === 'admin') {
            const result = await Trip.findOne({ tripId: cid })
            if (result) {
                const result = await Trip.deleteOne({ tripId: cid });
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
});

tripRoutes.patch('/update/:id', authenticate, async (req, res) => {
    const tripId = req.params.id;
    const body = req.body
    const {  riderName, passengersName, pickupLocation, dropLocation, status, distance } = body;

    try {

        // if (req.UserRole !== 'admin') {
        //     console.log('user not authenticated');
        //     return res.status(401).json({ message: "User not authenticated" });
        // }


        const available = await Trip.findOne({ tripId: tripId });
        if (!available) {
            return res.status(404).json({ message: 'Course not found!' });
        }


        const result = await Trip.updateOne(
            { tripId: tripId },
            {
                $set: {
                    riderName: riderName,
                    passengersName: passengersName,
                    pickupLocation: pickupLocation,
                    dropLocation: dropLocation,
                    status: status,
                    distance: distance
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(400).json({ message: 'Course could not be updated' });
        } else {
            return res.status(200).json({ message: 'Course updated successfully', result });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})





export { tripRoutes }