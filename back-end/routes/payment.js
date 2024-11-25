import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { Payment, Trips } from "../models/db.js";


const paymentRoute = Router();

paymentRoute.post('/addData', authenticate, async (req, res) => {

    const body = req.body;
    const { tripId, pickup, drop, distance, amount } = body;

    const result = await Trips.findOne({ tripId });
    let riderName = result.riderName

    if (req.UserRole === 'rider') {

        try {

            const newData = await Payment({
                tripId: tripId,
                riderName: riderName,
                distance: distance,
                pickupLocation: pickup,
                dropLocation: drop,
                amount: amount
            });

            await newData.save();
            res.status(200).json({ message: "successfully added!" })

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
});


paymentRoute.patch('/updateStatus/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'paid', 'failed'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    try {

        const result = await Payment.updateOne(
            { tripId: id },
            { $set: { status } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        res.status(200).json({
            message: 'Status updated successfully',
            updatedFields: { status },
            tripId: id,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});


paymentRoute.get('/search/:search', async (req, res) => {

    try {
        const search = req.params.search;

        const result = await Payment.find({ riderName: search });
        if (result) {
            res.status(200).json({ data: result })
        } else {
            res.status(404).json({ message: "user not found" })
        }

    } catch (err) {
        res.status(500).json({ message: "server error", data: err })

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


export { paymentRoute }