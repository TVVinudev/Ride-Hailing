import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { Payment, TripInitial } from "../models/db.js";


const paymentRoute = Router();

paymentRoute.post('/addData', authenticate, async (req, res) => {

    const body = req.body;
    const { rideId, pickupLocation, dropLocation, distance, amount } = body;

    console.log(rideId, pickupLocation, dropLocation, distance, amount);


    if (req.UserRole === 'rider') {

        try {
            const result = await TripInitial.findOne({ rideId: rideId });
            console.log(result);

            let riderName = result.riderName
            let passengerName = result.bookUser
            let tripId = result.tripId

            const newData = await Payment({
                tripId: tripId,
                rideId: rideId,
                riderName: riderName,
                bookUser: passengerName,
                distance: distance,
                pickupLocation: pickupLocation,
                dropLocation: dropLocation,
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

    const payment = await Payment.findOne({ rideId: id });
    if (!payment) {
        return res.status(404).json({ message: 'Invalid Id' });
    }

    const validStatuses = ['pending', 'paid', 'failed'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    try {
        
        const updateResult = await Payment.updateOne(
            { rideId: id }, 
            { $set: { paymentStatus: status } }
        );

        
        if (updateResult.matchedCount === 0) {
            return res.status(404).json({ message: 'Payment not found' });
        }

      
        res.status(200).json({
            message: 'Status updated successfully',
            updatedStatus: status, 
            tripId: id,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});



paymentRoute.get('/display/:id', async (req, res) => {

    try {
        const search = req.params.id;

        const result = await Payment.find({ rideId: search });
        if (result) {
            res.json(result)
        } else {
            res.status(404).json({ message: "user not found" })
        }

    } catch (err) {
        res.status(500).json({ message: "server error", data: err })

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
            console.log(ridersData);
            res.send(ridersData);
        } else {
            res.status(404).json({ message: "you are not admin" })
        }

    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
});

paymentRoute.delete('/delete/:id', authenticate, async (req, res) => {
    try {
        const id = req.params.id;

        if (req.UserRole === 'admin') {
            const result = await Payment.findOne({ rideId: id })
            if (result) {
                const result = await Payment.deleteOne({ rideId: id });
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


export { paymentRoute }