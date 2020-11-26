const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var imageSchema = Schema({ 
    name: String, 
    desc: String,
    date: Date,
    img: 
    { 
        data: Buffer, 
        contentType: String 
    } 
}); 

const cameraSchema = new Schema({
    cameraID: {
        type: String,
        required: true,
        unique: true
    },
    parkingSpots: {
        type: [String],
    },
    isActive: {
        type: Boolean,
        default: false,
        updatedAt: {
            type: Date,
            default: Date.now
        },
        required: true
    },

    setupImg: {imageSchema}
});

var Cameras = mongoose.model('Camera', cameraSchema)

module.exports = Cameras;