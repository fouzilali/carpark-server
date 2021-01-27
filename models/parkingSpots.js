const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const licensePlateSchema = new Schema({
    licensePlate: {
        type: String
    },
    userProfile: {
        type: String
    }
}, { timestamp: true });

const parkingSpotSchema = new Schema({
    spotID: {
        type: String,
        unique: true,
        required: true
    },
    cameraID: {
        type: String,
    },
    vacant: {
        type: Boolean,
        updatedAt: {
            type: Date,
            default: Date.now
        },
        // required: true
    },
    licensePlate: {
        type: String,
        default: ""
    },
    boundingBox: {
        x1: {
            type: Number,
        },
        y1: {
            type: Number,
        },
        x2: {
            type: Number,
        },
        y2: {
            type: Number,
        },
        x3: {
            type: Number,
        },
        y3: {
            type: Number,
        },
        x4: {
            type: Number,
        },
        y4: {
            type: Number,
        }
    },

});


var ParkingSpots = mongoose.model('ParkingSpot', parkingSpotSchema);




module.exports = ParkingSpots;