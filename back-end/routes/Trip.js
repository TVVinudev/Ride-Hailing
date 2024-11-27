import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { TripInitial, Trips } from "../models/db.js";


const tripRoutes = Router();


tripRoutes.post('/addData', authenticate, async (req, res) => {

    const user = req.UserRole;
    const body = req.body;
    const { tripId, riderName, bookUser, startingLocation, endingLocation, passengersName, pickupLocation, dropLocation, date, bookedSeats } = body;
    try {

        if (user) {

            const newData = new TripInitial({
                tripId: tripId,
                riderName: riderName,
                bookUser: bookUser,
                startingLocation: startingLocation,
                endingLocation: endingLocation,
                passengersName: passengersName,
                pickupLocation: pickupLocation,
                dropLocation: dropLocation,
                date: date,
                bookedSeats: bookedSeats,
            });

            await newData.save()
            res.status(200).json({ message: 'request send' })

        } else {
            res.status(404).json({ message: "you are need to login" })
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
})


tripRoutes.patch('/updateStatus/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['accept', 'cancelled', 'pickup', 'onGoing', 'dropped', 'waiting'];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    try {
        const result = await TripInitial.updateOne(
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
        console.error(`[Error] Status Update Failed for tripId: ${id} - ${error.message}`);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
});


tripRoutes.get('/getUserData/:id', authenticate, async (req, res) => {

    const bookUser = req.params.id;

    try {
        const data = await TripInitial.find({ bookUser: bookUser })
        res.json(data);
        console.log(data);

    } catch (error) {
        console.error(error);

    }
})

export { tripRoutes }