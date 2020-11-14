const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cameraSchema = new Schema({
    cameraID: {
         type: String,
         required: true,
         unique: true
     },
    parkingSpots:{
        type: [String],
    },
    isActive: {
        type: Boolean,
        updatedAt:{
            type: Date,
            default: Date.now
        },
        required: true
    },
        
    setupImg: {
        name: String,
        desc: String,
        date: Schema.Types.Date,
        img: {    
            data: Buffer,
            contentType: String
        }
    }
});



module.exports = cameraSchema;