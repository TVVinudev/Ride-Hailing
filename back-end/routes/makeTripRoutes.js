import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { Rider, Trips } from "../models/db.js";

const MakeTrip = Router();


MakeTrip.post('/addTrip', authenticate, async (req, res) => {

    const body = req.body;
    const { startLocation,
        routes,
        endLocation,
        seats,
        dropoff,
        time,
        vehicleModel,
        registrationNumber,
        distance } = body;
    console.log(startLocation);

    const now = new Date();
    const tripId = 'TRIP-' + now.getFullYear() + now.getMonth() + now.getDate() + now.getHours() + now.getMinutes() + now.getMilliseconds()


    try {
        if (req.UserRole === 'admin' || req.UserRole === 'rider') {
            const user = req.UserName;
            console.log(user, tripId);

            const newData = new Trips({
                tripId: tripId,
                userName: user,
                startingLocation: startLocation,
                endingLocation: endLocation,
                tripRoutes: routes,
                distance: distance,
                scheduledDate: dropoff,
                scheduledTime: time,
                vehicle: vehicleModel,
                vehicleRegistrationNumber: registrationNumber,
                availableSeats: seats
            });

            await newData.save();

            res.status(200).json({ message: "trip created" })


        } else {
            res.json({ message: 'No Permission' })
        }
    } catch (error) {
        console.error(error);

    }

});

MakeTrip.get('/getAll', authenticate, async (req, res) => {

    if (req.UserRole === 'admin' || req.UserRole === 'rider') {
        try {
            const data = await Trips.find()
            res.json(data);
            console.log(data);

        } catch (error) {
            console.error(error);

        }
    } else {
        res.status(404).json({ message: "Not allowed to view!" })
    }


})

MakeTrip.get('/getUser/:id', authenticate, async (req, res) => {

    const id = req.params.id

    if (req.UserRole === 'admin' || req.UserRole === 'rider') {
        try {
            const data = await Trips.findOne({ tripId: id })
            res.json(data);
            console.log(data);

        } catch (error) {
            console.error(error);

        }
    } else {
        res.status(404).json({ message: "Not allowed to view!" })
    }


})


MakeTrip.delete('/deleteTrip/:id', authenticate, async (req, res) => {

    const id = req.params.id

    if (req.UserRole == 'admin' || req.UserRole === 'rider') {

        try {
            await Rider.deleteOne({ tripId: id })
            res.status(200).json({ Message: 'Delete successfully' })
        } catch (error) {
            console.error(error);

        }
    } else {
        res.status(404).json9 / { message: "not allowed to this function!" }
    }

})



MakeTrip.get('/filter', authenticate, async (req, res) => {
    const { value1, value2, date, seats } = req.query;

    console.log(value1, value2, date, seats);

    const filteredTrips = [];

    try {

        const results = await Trips.find({ scheduledDate: date });

        console.log(results)

        results.forEach((result) => {

            const startsAtValue1 = result.startingLocation === value1;
            const passesValue1 = result.tripRoutes.includes(value1);
            const endsAtValue2 = result.endingLocation === value2;
            const passesValue2 = result.tripRoutes.includes(value2);


            const availableSeats = result.availableSeats;

            if ((startsAtValue1 || passesValue1) && (endsAtValue2 || passesValue2) && availableSeats >= seats) {
                filteredTrips.push(result);
            }
        });


        if (filteredTrips.length > 0) {
            res.status(200).json(filteredTrips);
        } else {
            res.status(200).json({ message: "No data found!" });
        }

    } catch (error) {
        console.error('Error fetching trips:', error);
        res.status(500).json({ error: 'An error occurred while fetching trip data.' });
    }
});


MakeTrip.patch('/update/:id', authenticate, async (req, res) => {

    const id = req.params.id;
    const body = req.body
    const { startingLocation, endLocation, routes, distance, date, time, vehicle, registrationNumber, availableSeats, status } = body

    if (req.UserRole === 'rider' || req.UserRole === 'admin') {

        try {

            const result = await Trips.findOne({ tripId: id });
            if (result) {
                const data = await Trips.updateOne(
                    { tripId: id },
                    {
                        $set: {
                            startingLocation: startingLocation,
                            endingLocation: endLocation,
                            tripRoutes: routes,
                            distance: distance,
                            scheduledDate: date,
                            scheduledTime: time,
                            vehicle: vehicle,
                            vehicleRegistrationNumber: registrationNumber,
                            availableSeats: availableSeats,
                            status: status
                        }
                    }
                );

                if (data.matchedCount === 0) {
                    return res.status(400).json({ message: ' could not be updated' });
                } else {
                    return res.status(200).json({ message: ' updated successfully', result });
                }
            }

        } catch (error) {
            console.error(error);

        }
    } else {
        res.status(404).json({ message: "Not allowed" })
    }



})





export { MakeTrip }