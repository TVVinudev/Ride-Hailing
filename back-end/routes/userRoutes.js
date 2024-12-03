import { Router } from 'express';
import dotenv from 'dotenv';
import { User } from '../models/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from '../middleware/auth.js';


dotenv.config();
const userRoutes = Router();
const secretKey = process.env.secretKey;


userRoutes.get('/', (req, res) => {
    res.send('Hello')
});


userRoutes.post('/signup', async (req, res) => {

    const body = req.body;
    const { firstName, lastName, userName, password, contact, email } = body;
    console.log(firstName, lastName, userName, password, contact, email);



    const newPassword = await (bcrypt.hash(password, 10));
    console.log(newPassword);


    try {

        const found = await User.findOne({ role: 'admin' });
        let role = 'user';

        if (!found) {
            role = 'admin'
        }

        const result = await User.findOne({ userName: userName });

        if (result) {
            res.status(404).json({ message: "user already exist" })
        } else {
            const newData = new User({

                firstName: firstName,
                lastName: lastName,
                userName: userName,
                password: newPassword,
                contact: contact,
                email: email,
                role: role
            });

            await newData.save();
            res.status(201).json({ message: " User Created " });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "server error!" })
    }
});


userRoutes.post('/login', async (req, res) => {
    try {

        const body = req.body;
        const { userName, password } = body;

        const result = await User.findOne({ userName: userName });
        console.log(result.role);


        if (result) {
            const valid = await bcrypt.compare(password, result.password)
            if (valid) {
                const token = jwt.sign({ UserName: userName, UserRole: result.role }, secretKey, { expiresIn: '7h' });
                console.log(token);

                res.cookie('riderToken', token, { httpOnly: true });
                res.status(200).json({ message: 'Success' })
            } else {
                res.status(400).json({ message: 'please check your username and password' })
                console.log("please check your username and password");
            }
        } else {
            res.status(404).json({ message: 'Data not found!' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "server error!" })
    }
})


//logout

userRoutes.get('/logout', authenticate, (req, res) => {
    try {
        if (req.UserRole) {
            res.clearCookie('riderToken');
            res.status(200).json({ message: "Logout successfull" });
        } else {
            res.status(404).json({ message: "No user found!" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" })
    }

});

userRoutes.get('/viewAllUsers', authenticate, async (req, res) => {
    try {

        if (req.UserRole === 'admin' || req.UserRole === 'user' || req.UserRole === 'rider') {
            const userData = await User.find();
            res.status(200).json({ message: "Success", data: userData })
        } else {
            res.status(404).json({ message: "you are not an Admin" })
        }

    } catch (error) {
        res.status(500).json({ message: "Server isssue" })
    }
});


userRoutes.get('/viewUser', authenticate, (req, res) => {
    try {
        const user = req.UserRole;
        console.log(user)
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
})

userRoutes.get('/userName', authenticate, (req, res) => {
    try {
        const user = req.UserName;
        console.log(user)
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
})

userRoutes.get('/search/:search', async (req, res) => {

    try {

        const search = req.params.search;

        const result = await User.findOne({ userName: search })
        if (result) {
            res.status(200).json({ data: result })
        } else {
            res.status(404).json({ message: "user not found" })
        }

    } catch (err) {
        console.log(err);

    }
});


userRoutes.put('/update/:id', authenticate, async (req, res) => {
    const userName = req.params.id;
    const body = req.body
    const { firstName, lastName, contact, email } = body;

    if (!userName || !firstName || !lastName || !contact || !email) {
        return res.status(400).json({ message: 'All fields are required: cid, cname, ctype, cdescription, cprice' });
    }

    try {

        const available = await User.findOne({ userName: userName });
        if (!available) {
            return res.status(404).json({ message: 'Course not found!' });
        }


        const result = await User.updateOne(
            { userName: userName },
            {
                $set: {
                    firstName: firstName,
                    lastName: lastName,
                    contact: contact,
                    email: email,
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(400).json({ message: ' could not be updated' });
        } else {
            return res.status(200).json({ message: ' updated successfully', result });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


userRoutes.patch('/update/:id', authenticate, async (req, res) => {
    const userName = req.params.id;
    const body = req.body
    const { firstName, lastName, contact, email } = body;

    try {
        const available = await User.findOne({ userName: userName });
        if (!available) {
            return res.status(404).json({ message: 'Course not found!' });
        }


        const result = await User.updateOne(
            { userName: userName },
            {
                $set: {
                    firstName: firstName,
                    lastName: lastName,
                    contact: contact,
                    email: email,
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

userRoutes.delete('/deleteUser/:id', authenticate, async (req, res) => {
    try {
        const cid = req.params.id;

        if (req.UserRole === 'admin') {
            const result = await User.findOne({ userName: cid })
            if (result) {
                const result = await User.deleteOne({ userName: cid });
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




export { userRoutes };
