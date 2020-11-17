var mongoose = require('mongoose');

//Setup Database
const url = "mongodb+srv://smartCarPark:fyp2021@carparkcluster.lnhjd.mongodb.net/carpark-db?retryWrites=true&w=majority";
const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
connect.then((db) => {
    console.log(`DB: Connected to ${url}`);
}, (err) => { console.log(err); });

const Cameras = require('./models/cameras');
const parkingSpots = require('./models/parkingSpots');

// TODO: make functions for querying the database