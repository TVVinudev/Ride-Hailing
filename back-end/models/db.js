import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    contact: { type: String, validate: { validator: function (v) { return /\d{10}/.test(v); }, message: props => `${props.value} is not a valid contact number!` } },
    email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, 'Please fill a valid email address'] },
    role: { type: String, default: 'user' }
});

const riderSchema = new Schema({
    tripId: { type: String, unique: true, required: true },
    date: { type: String },
    userName: { type: String, required: true },
    startingLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    routesTo: [{ type: String }],
    availableSeats: { type: Number, default: 1 },
    contact: {
        type: String,
        validate: {
            validator: function (v) { return /\d{10}/.test(v); },
            message: props => `${props.value} is not a valid contact number!`
        }
    },
    license: { type: String },
    vehicle: { type: String },
    insurance: { type: String },
    vehicleNumber: { type: String },
    ac: { type: Boolean, default: false }
});


const passengerSchema = new Schema({
    tripId: { type: String, unique: true, required: true },
    userName: { type: String },
    pickupLocation: { type: String },
    dropLocation: { type: String },
    numberPassenger: { type: String },
    coPassengers: [{ type: String }],

});


const tripSchema = new Schema({
    tripId: { type: String, unique: true, required: true },
    riderName: { type: String, required: true },
    passengersName: { type: [String], required: true },
    pickupLocation: { type: String, required: true },
    dropLocation: { type: String, required: true },
    status: { type: String, enum: ['pickup', 'pending', 'completed', 'canceled'], default: 'pending' },
    distance: { type: Number, required: true }
});

const paymentSchema = new Schema({
    transactionId: { type: String, unique: true, required: true },
    tripId: { type: String, required: true, ref: 'Trip' },
    riderName: { type: String, required: true },
    passengersName: { type: [String], required: true },
    distance: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    amount: { type: Number, required: true }
});


const rating = new Schema({
    tripId: { type: String, required: true, ref: 'Trip' },
    riderName: { type: String, required: true },
    passengersName: { type: [String], required: true },
    rating: { type: String },
    comment: { type: String }
})




const User = mongoose.model('userDetails', userSchema);
const Rider = mongoose.model('ridersDetails', riderSchema);
const Passengers = mongoose.model('passengersDetails', passengerSchema);
const Trip = mongoose.model('tripDetails', tripSchema);
const Payment = mongoose.model('paymentDetails', paymentSchema);
const Rating = mongoose.model('rating', rating)

mongoose.connect('mongodb://localhost:27017/Rider');





export { User, Rider, Passengers, Trip, Payment, Rating };