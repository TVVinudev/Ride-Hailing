import mongoose, { Schema } from "mongoose";

// --- User Schema ---
const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    contact: {
        type: String,
        validate: {
            validator: function (v) { return /\d{10}/.test(v); },
            message: props => `${props.value} is not a valid contact number!`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    role: { type: String, enum: ['user', 'admin', 'rider'], default: 'user' }
});

// --- Rider Schema ---
const riderSchema = new Schema({
    userName: { type: String, ref: 'User', required: true },
    contact: {
        type: String,
        validate: {
            validator: function (v) { return /\d{10}/.test(v); },
            message: props => `${props.value} is not a valid contact number!`
        }
    },
    license: { type: String, required: true },
    Status: { type: String, enum: ['pending', 'verified', 'cancelled'], default: 'pending' }
});


// ---  Make a Trip Schema ---
const makeTripSchema = new Schema({
    tripId: { type: String, unique: true, required: true },
    userName: { type: String, ref: 'User', required: true },
    startingLocation: { type: String, required: true },
    endingLocation: { type: String, required: true },
    tripRoutes: {
        type: [String],
        required: true
    },
    distance: { type: Number, required: true },
    scheduledDate: { type: String, required: true },
    scheduledTime: { type: String, required: true },
    vehicle: { type: String, required: true },
    vehicleRegistrationNumber: { type: String, required: true },
    availableSeats: { type: Number, required: true }
});


const passengerSchema = new Schema({
    userName: { type: String, ref: 'User', required: true },
    pickupLocation: { type: String },
    dropLocation: { type: String },
    bookedSeats: { type: Number },
    date: { type: String },
    passengersName: [{ type: String }]
});

const tripInitial = new Schema({
    tripId: { type: String, ref: 'Trips' },
    riderName: { type: String, ref: 'Trips' },
    startingLocation: { type: String, ref: 'Trips' },
    endingLocation: { type: String, ref: 'Trips' },
    passengersName: { type: String, ref: 'Passenger' },
    pickupLocation: { type: String, ref: 'Passenger' },
    dropLocation: { type: String, ref: 'Passenger' },
    date: { type: String, ref: 'Passenger' },
    bookedSeats: { type: Number, ref: 'Passenger' },
    status: { type: String, enum: ['request', 'accept', 'cancelled', 'pickup', 'onGoing', 'dropped', 'waiting'], default: 'request' }
})

// --- Payment Schema ---
const paymentSchema = new Schema({
    tripId: { type: String, required: true, ref: 'TripInitial' },
    riderName: { type: String, ref: 'Trips' },
    distance: { type: Number, required: true },
    pickupLocation: { type: String, ref: 'TripInitial' },
    dropLocation: { type: String, ref: 'TripInitial' },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    amount: { type: Number, required: true }
});

// --- Rating Schema ---
const ratingSchema = new Schema({
    tripId: { type: String, required: true, ref: 'Trip' },
    riderName: { type: String, required: true },
    passengersName: { type: [String], required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String }
});


// --- Models ---
const User = mongoose.model('User', userSchema);
const Rider = mongoose.model('Rider', riderSchema);
const Passenger = mongoose.model('Passenger', passengerSchema);
const Trips = mongoose.model('Trip', makeTripSchema);
const Payment = mongoose.model('Payment', paymentSchema);
const Rating = mongoose.model('Rating', ratingSchema);
const TripInitial = mongoose.model('TripInitial', tripInitial)



// --- Database Connection ---
mongoose.connect('mongodb://localhost:27017/Rider')
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));

// --- Export Models ---
export { User, Rider, Passenger, Trips, Payment, Rating, TripInitial };
