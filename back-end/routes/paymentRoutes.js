import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { Payment } from "../models/db.js";



const paymentRoute = Router();

paymentRoute.post('/addPayment', authenticate, async (req, res) => {

    const body = req.body;

    const {
        transactionId,
        tripId,
        riderName,
        passengersName,
        distance,
        paymentStatus,

    } = body

    let amount = distance * 28;

    console.log(
        transactionId, tripId, riderName, passengersName, distance, paymentStatus, amount
    );

    if (req.UserRole === 'admin') {
        const value = await Payment.findOne({ transactionId: transactionId });
        if (value) {
            res.status(409).json({ message: "Already exist" });
        } else {
            const newData = new Payment({
                transactionId: transactionId,
                tripId: tripId,
                riderName: riderName,
                passengersName: passengersName,
                distance: distance,
                paymentStatus: paymentStatus,
                amount: amount
            });

            console.log(newData)
            await newData.save();
            res.status(201).json({ message: "payment added" })

        }
    } else {
        res.status(404).json({ message: "not a valid user" })
    }

});


paymentRoute.get('/viewAll', authenticate, async (req, res) => {
    try {

        if (req.UserRole == 'admin') {
            const ridersData = await Payment.find();
            res.send(ridersData);
        } else {
            res.status(404).json({ message: "you are not admin" })
        }

    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
});

paymentRoute.get('/search/:search', authenticate, async (req, res) => {

    try {
        const search = req.params.search;

        if (req.UserRole === 'admin') {


            const result = await Payment.find({ transactionId: search })
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

paymentRoute.delete('/delete/:id', authenticate, async (req, res) => {
    try {
        const cid = req.params.id;

        if (req.UserRole === 'admin') {
            const result = await Payment.findOne({ tripId: cid })
            if (result) {
                const result = await Payment.deleteOne({ tripId: cid });
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


paymentRoute.patch('/update/:id', authenticate, async (req, res) => {
    const tripId = req.params.id;
    const body = req.body
    const { transactionId, riderName, passengersName, distance, paymentStatus, amount } = body;

    try {


        const available = await Payment.findOne({ tripId: tripId });
        if (!available) {
            return res.status(404).json({ message: 'Course not found!' });
        }


        const result = await Payment.updateOne(
            { tripId: tripId },
            {
                $set: {
                    transactionId: transactionId,
                    riderName: riderName,
                    passengersName: passengersName,
                    distance: distance,
                    paymentStatus: paymentStatus,
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






export { paymentRoute }