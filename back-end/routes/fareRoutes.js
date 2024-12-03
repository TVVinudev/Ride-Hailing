import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { Fare } from "../models/db.js";

const fareRoute = Router();

fareRoute.get('/', (req, res) => {
    res.send('fare data')
});

fareRoute.post('/addData', authenticate, async (req, res) => {
    const role = req.UserRole
    console.log(role);
    const body = req.body;
    const { amount, additionalFee, peek } = body

    if (role !== 'admin') {
        return res.status(404).json({ message: "not allowed" })
    }

    try {
        const newData = new Fare({
            amount: amount,
            additionalFee: additionalFee,
            peekTimeFee: peek
        })
        await newData.save();
        res.status(200).json({ message: "add data" })
    } catch (error) {
        console.error(error);

    }

});

fareRoute.get('/getAll', authenticate, async (req, res) => {

    if (req.UserRole === 'admin' || req.UserRole === 'rider' || req.UserRole==='user') {
        try {
            const data = await Fare.find()
            res.json(data);
            console.log(data);

        } catch (error) {
            console.error(error);

        }
    } else {
        res.status(404).json({ message: "Not allowed to view!" })
    }


})



fareRoute.patch('/updateData', authenticate, async (req, res) => {
    const role = req.UserRole
    console.log(role);
    const body = req.body;

    const { amount, additionalFee, peek } = body
    console.log(amount, additionalFee, peek);
    


    if (role === 'admin') {
        const data = await Fare.updateMany(
            {},
            {
                $set: {
                    amount: amount,
                    additionalFee: additionalFee,
                    peekTimeFee: peek
                }
            }
        );

        if (data.matchedCount === 0) {
            return res.status(400).json({ message: ' could not be updated' });
        } else {
            return res.status(200).json({ message: ' updated successfully', data });
        }
    } else {
        console.log('Not Allowed');

    }

})


export { fareRoute }