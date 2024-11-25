import { Router } from 'express';

import { Rider, User } from '../models/db.js';
import { authenticate } from '../middleware/auth.js';


const riderRoute = Router();

riderRoute.get('/', (req, res) => {
    res.send('hellow')
})

riderRoute.post('/addDetails', authenticate, async (req, res) => {


    const body = req.body
    const license = body.license;
    const user = req.UserName;

    console.log(user);


    try {
        const result = await User.findOne({ userName: user })

        if (result) {
            const contact = result.contact;

            const newData = new Rider({
                userName: user,
                license: license,
                contact: contact,
            });

            await newData.save();

            res.status(200).json({ message: "successfully added!" })

        } else {
            res.status(404).json({ message: "Data not found!" })
        }
    } catch (error) {
        console.error(error);

    }
})

riderRoute.post('/verified/:id', authenticate, async (req, res) => {

    const role = req.UserRole;
    const user = req.params.id;

    if (role === 'admin') {

        const result = await Rider.updateOne(
            { userName: user },
            {
                $set: {
                    Status: 'verified'
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(400).json({ message: 'Course could not be updated' });

        } else {

            await User.updateOne(
                { userName: user },
                {
                    $set: {
                        role: 'rider'
                    }
                }

            )
            return res.status(200).json({ message: 'Course updated successfully', result });

        }

    }

})

riderRoute.post('/cancelled/:id', authenticate, async (req, res) => {

    const role = req.UserRole;
    const user = req.params.id;

    if (role === 'admin') {

        const result = await Rider.updateOne(
            { userName: user },
            {
                $set: {
                    Status: 'cancelled'
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(400).json({ message: 'Course could not be updated' });

        } else {
            return res.status(200).json({ message: 'Course updated successfully', result });
        }

    }

})


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



riderRoute.get('/search/:search', async (req, res) => {

    try {
        const search = req.params.search;

        const result = await Rider.find({ userName: search });
        if (result) {
            res.status(200).json({ data: result })
        } else {
            res.status(404).json({ message: "user not found" })
        }

    } catch (err) {
        res.status(500).json({ message: "server error", data: err })

    }
});

riderRoute.patch('/update/:id', authenticate, async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const license = body
    if (req.UserName !== 'rider') return res.json({ message: "no permision to change the data" });

    const result = await Rider.updateOne(
        { userName: id },
        $set[
        {
            license: license
        }
        ]
    );

    if (result.matchedCount == 0) {
        res.status(404).json({ message: "not updated", result })
    } else {
        res.status(200).json({ message: " update successfully", result })
    }

})




riderRoute.delete('/delete/:id', authenticate, async (req, res) => {
    try {
        const cid = req.params.id;

        if (req.UserRole === 'admin' || req.UserName === 'rider') {
            const result = await Rider.findOne({ userName: cid })
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