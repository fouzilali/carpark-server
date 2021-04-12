const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const licensePlateSchema = new Schema({
    lpNumber: {
        type: String,
        unique: true,
        required: true,
    },
    timeEntered: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    userProfile: {
        type: String,
    },
});

const parkingSpotSchema = new Schema({
    spotID: {
        type: String,
        unique: true,
        required: true,
    },
    cameraID: {
        type: String,
        required: true,
    },
    vacant: {
        type: Boolean,
        required: true,
    },
    reserved: {
        type: Boolean,
        required: true,
    },
    lpNumber: {
        type: String,
        unique: true,
        trim: true,
        index: true,
        sparse: true,
    },
    timeEntered: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    boundingBox: {
        x1: { type: Number },
        y1: { type: Number },
        x2: { type: Number },
        y2: { type: Number },
        x3: { type: Number },
        y3: { type: Number },
        x4: { type: Number },
        y4: { type: Number },
    },
    mapXY: {
        x: { type: Number },
        y: { type: Number },
    },
});

var ParkingSpots = mongoose.model("ParkingSpot", parkingSpotSchema);

module.exports = ParkingSpots;
