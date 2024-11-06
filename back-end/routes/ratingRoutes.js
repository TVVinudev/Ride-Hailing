import { Router } from "express";
import { Rating } from "../models/db.js";
import { authenticate } from '../middleware/auth.js';


const ratingRoutes = Router();


ratingRoutes.post('/addRating', async (req, res) => {
    const body = req.body;
    const {
        tripId,
        riderName,
        passengersName,
        rating,
        comment
    } = body;

    console.log(tripId,
        riderName,
        passengersName,
        rating,
        comment);

    // const result = await Rating.findOne({ tripId: tripId });
    // if (result) {
    //     res.status(404).json({ message: "already added" });
    // }
    try {
        const newData = new Rating({
            tripId: tripId,
            riderName: riderName,
            passengersName: passengersName,
            rating: rating,
            comment: comment
        });

        await newData.save();
        res.status(201).json({message:"data added"})

    } catch (error) {
        res.status(500).json({ message: "server error" })
    }

});



ratingRoutes.get('/viewAll', authenticate, async (req, res) => {
    try {

        if (req.UserRole == 'admin') {
            const ridersData = await Rating.find();
            res.send(ridersData);
        } else {
            res.status(404).json({ message: "you are not admin" })
        }

    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
});

ratingRoutes.get('/search/:search', authenticate, async (req, res) => {

    try {
        const search = req.params.search;

        if (req.UserRole === 'admin') {


            const result = await Rating.find({ tripId: search })
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

ratingRoutes.delete('/delete/:id', authenticate, async (req, res) => {
    try {
        const cid = req.params.id;

        if (req.UserRole === 'admin') {
            const result = await Rating.findOne({ tripId: cid })
            if (result) {
                const result = await Rating.deleteOne({ tripId: cid });
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




export { ratingRoutes };