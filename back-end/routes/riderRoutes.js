import { json, Router } from 'express';
import dotenv from 'dotenv';
import { Rider, User } from '../models/db.js';
import { authenticate } from '../middleware/auth.js';


const riderRoute = Router();

riderRoute.get('/', (req, res) => {
    res.send('hellow')
})


riderRoute.post('/createRide', authenticate, async (req, res) => {

    try {
        const body = req.body;

        const {
            tripId,
            date,
            userName,
            startingLocation,
            endLocation,
            routesTo,
            availableSeats,
            contact,
            license,
            vehicle,
            insurance,
            vehicleNumber,
            ac
        } = body;

        console.log(req.UserRole);

        if (req.UserRole) {

            const user = await User.findOne({ userName: userName });
            console.log(user);

            if (user) {

                const newData = new Rider({
                    tripId: tripId,
                    date:date,
                    userName: userName,
                    startingLocation: startingLocation,
                    endLocation: endLocation,
                    routesTo: routesTo,
                    availableSeats: availableSeats,
                    contact: contact,
                    license: license,
                    vehicle: vehicle,
                    insurance: insurance,
                    vehicleNumber: vehicleNumber,
                    ac: ac
                });

                console.log(newData)
                await newData.save();
                res.status(201).json({ message: "Ride registered" })

            } else {

                res.status(404).json({ message: "user not found" })

            }
        } else {
            console.log("need a user")
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: ":server error" });
    }
});


riderRoute.get('/viewAll', authenticate, async (req, res) => {
    try {

        if (req.UserRole == 'admin') {
            const ridersData = await Rider.find();
            res.send(ridersData);
        } else {
            res.status(404).json({ message: "you are not admin" })
        }

    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
});

riderRoute.get('/search/:search', authenticate, async (req, res) => {

    try {
        const search = req.params.search;

        if (req.UserRole === 'admin') {


            const result = await Rider.find({ userName: search })
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

riderRoute.delete('/delete/:id', authenticate, async (req, res) => {
    try {
        const cid = req.params.id;

        if (req.UserRole === 'admin') {
            const result = await Rider.findOne({ tripId: cid })
            if (result) {
                const result = await Rider.deleteOne({ tripId: cid });
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





export { riderRoute }