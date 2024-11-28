import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { TripInitial, Trips, User } from "../models/db.js";


const tripRoutes = Router();


tripRoutes.post('/addData', authenticate, async (req, res) => {

    const user = req.UserRole;
    const body = req.body;
    const { tripId, riderName, bookUser, startingLocation, endingLocation, passengersName, pickupLocation, dropLocation, date, bookedSeats } = body;

    const now = new Date();
    const rideId = bookUser + now.getFullYear() + now.getMonth() + now.getDate() + now.getHours() + now.getMinutes() + now.getMilliseconds();

    const resp = await TripInitial.findOne({ rideId: rideId });
    if (resp) {
        res.status(404).json({ message: "already exist!" })
    }

    try {
        const result = await User.findOne({ userName: bookUser });
        console.log(result);

        if (user) {

            const newData = new TripInitial({
                tripId: tripId,
                rideId: rideId,
                riderName: riderName,
                bookUser: bookUser,
                bookedUserContact: result.contact,
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
        const tripUpdateResult = await TripInitial.updateOne(
            { rideId: id },
            { $set: { status } }
        );

        if (tripUpdateResult.matchedCount === 0) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        if (status === 'accept') {
            try {
                const tripDetails = await TripInitial.findOne({ rideId: id });

                if (!tripDetails) {
                    return res.status(404).json({ message: 'Trip details not found after status update' });
                }

                if (tripDetails.tripId) {
                    try {
                        const tripInfo = await Trips.findOne({ tripId: tripDetails.tripId });

                        if (!tripInfo) {
                            return res.status(404).json({ message: 'Linked trip not found' });
                        }

                        const balanceSeat = tripInfo.availableSeats - tripDetails.bookedSeats;

                        await Trips.updateOne(
                            { tripId: tripDetails.tripId },
                            { $set: { availableSeats: balanceSeat } }
                        );

                        console.log(`Available seats updated for tripId: ${tripDetails.tripId}, new balance: ${balanceSeat}`);
                    } catch (seatUpdateError) {
                        console.error(`[Error] Updating available seats for tripId: ${tripDetails.tripId} - ${seatUpdateError.message}`);
                        return res.status(500).json({ message: 'Failed to update available seats', error: seatUpdateError.message });
                    }
                }
            } catch (findError) {
                console.error(`[Error] Fetching trip details failed for rideId: ${id} - ${findError.message}`);
                return res.status(500).json({ message: 'Failed to fetch trip details', error: findError.message });
            }
        }

        if (status === 'cancelled' || status === 'dropped') {
            try {
                const tripDetails = await TripInitial.findOne({ rideId: id });

                if (!tripDetails) {
                    return res.status(404).json({ message: 'Trip details not found after status update' });
                }

                if (tripDetails.tripId) {
                    try {
                        const tripInfo = await Trips.findOne({ tripId: tripDetails.tripId });

                        if (!tripInfo) {
                            return res.status(404).json({ message: 'Linked trip not found' });
                        }

                        const balanceSeat = tripInfo.availableSeats + tripDetails.bookedSeats;

                        await Trips.updateOne(
                            { tripId: tripDetails.tripId },
                            { $set: { availableSeats: balanceSeat } }
                        );

                        console.log(`Available seats updated for tripId: ${tripDetails.tripId}, new balance: ${balanceSeat}`);
                    } catch (seatUpdateError) {
                        console.error(`[Error] Updating available seats for tripId: ${tripDetails.tripId} - ${seatUpdateError.message}`);
                        return res.status(500).json({ message: 'Failed to update available seats', error: seatUpdateError.message });
                    }
                }
            } catch (findError) {
                console.error(`[Error] Fetching trip details failed for rideId: ${id} - ${findError.message}`);
                return res.status(500).json({ message: 'Failed to fetch trip details', error: findError.message });
            }
        }


        res.status(200).json({
            message: 'Status updated successfully',
            updatedFields: { status },
            rideId: id,
        });

    } catch (error) {
        console.error(`[Error] Status Update Failed for rideId: ${id} - ${error.message}`);
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

tripRoutes.get('/getRiderData/:id', authenticate, async (req, res) => {

    const id = req.params.id;

    try {
        const data = await TripInitial.find({ riderName: id })
        res.json(data);
        console.log(data);

    } catch (error) {
        console.error(error);

    }
})

tripRoutes.get('/getByRideID/:id', authenticate, async (req, res) => {

    const id = req.params.id;

    try {
        const data = await TripInitial.findOne({ rideId: id })
        res.json(data);
        console.log(data);

    } catch (error) {
        console.error(error);

    }
})

tripRoutes.get('/viewAll', authenticate, async (req, res) => {
    try {

        if (req.UserRole === 'admin') {
            const userData = await TripInitial.find();
            res.status(200).json({ message: "Success", data: userData })
        } else {
            res.status(404).json({ message: "you are not an Admin" })
        }

    } catch (error) {
        res.status(500).json({ message: "Server isssue" })
    }
});

export { tripRoutes }