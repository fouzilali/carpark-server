var express = require('express');
var router = express.Router();
const ParkingSpots = require('../models/parkingSpots');

/**
 * This function is for updating the status of the parking spot 
 * once a car has entered and has been allocated the parking 
 * space
 * @param {string} CameraID
 * @param {string} Licence_Plate_number 
 * @param {string} spotID
 * @param {time} time
 * @returns {Object} ParkingSpot
 */
router.put('/spotFilled', async(req, res, next) =>{
    try{
        result  = await  ParkingSpots.findOne({spotID : req.body.spotID}, async(err, doc) =>{
            doc.spotID = 'A1';
            doc.cameraID = req.body.cameraID;
            doc.vacant = false;
            doc.licensePlate = req.body.licensePlate;
            doc.save();
        });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
})


/**
 * This function is for updating the status of the parking spot 
 * once a car has exited and has freed a parking 
 * space
 * @param {string} CameraID
 * @param {string} Licence_Plate_number 
 * @param {string} spotID
 * @param {time} time
 * @returns {Object} ParkingSpot
 */
router.put('/spotVacated', async(req, res, next) => {
    try{
        result  = await  ParkingSpots.findOne({spotID : req.body.spotID}, async(err, doc) =>{
            doc.spotID = req.body.spotID,
                doc.cameraID = req.body.cameraID,
                doc.vacant = true,
                doc.licensePlate = null,
                doc.boundingBox = null
            doc.save();
        });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
})


/**
 * This function is for checking if a particular spot
 * is filled
 * @param {string} spotID
 * @returns {boolean} filled?
 */
router.get('/isFilled', async(req, res, next) => {
    try{
        result  = await  ParkingSpots.findOne({spotID: req.body.spotID}); 
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(!(result.vacant));
    } catch (err) {
        console.error(err);
        res.json(err);
    }
})

/**
 * This function is for getting the license plate number of 
 * a parked car
 * @param {string} CameraID
 * @param {string} spotID
 * @param {time} time
 * @returns {string} Licence_Plate_number 
 */
router.get('/getLPNumber', async(req, res, next) => {
    try{
        result  = await  ParkingSpots.findOne({spotID: req.body.spotID}); 
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result.licensePlate);
    } catch (err) {
        console.error(err);
        res.json(err);
    }})

/**
 * This function is for getting the license plate number of 
 * a parked car
 * @param {string} spotID
 * @param {time} time
 * @returns {boolean} vacancy  
 */    
router.get('/isVacated', async(req, res, next) => {
    // isVacated(ParkingSpot) -> bool
    try {
        result = await ParkingSpots.findOne({ spotID: req.body.spotID });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result.vacant);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
});


// These two are for further features that will be implemented after the initial integration
//with the raspberry pi and front-end.

router.get('/userProfile', async(req, res, next) => {
    // userProfile(licensePlate)-> userProfile
});

router.get('/getTimeSpent', async(req, res, next) => {
    // getTimeSpent(licensePlate/userProfile)
});


module.exports = router;
