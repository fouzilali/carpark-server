const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const licensePlateSchema = new Schema({
    userProfile: {
        type: String,
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
        required: true
    },
    licensePlate: {
        type: String,
        default: ""
    },
    boundingBox: {
        x1: {
            type: Number,
        },
        x2: {
            type: Number,
        },
        y1: {
            type: Number,
        },
        y2: {
            type: Number,
        }
    },

});





module.exports = parkingSpotSchema;