var express = require('express');
var router = express.Router();
const ParkingSpots = require('../models/parkingSpots');

// TODO: 'operation' stage API fucntions

router.put('/spotFilled', async (req, res, next) => {
    // spotFilled(CameraID, LPNumber, PixelLocation, time)
    try {
        result = await ParkingSpots.findOne({ spotID: req.body.spotID }, async (err, doc) => {
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
router.put('/spotVacated', async (req, res, next) => {
    // spotVacated(CameraID, PixelLocation, time)
    try {
        result = await ParkingSpots.findOne({ spotID: req.body.spotID }, async (err, doc) => {
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
        res.json(err)
    }
})

router.get('/isFilled', async (req, res, next) => {
    try {
        result = await ParkingSpots.findOne({ spotID: req.body.spotID });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(!(result.vacant));
    } catch (err) {
        console.error(err);
        res.json(err);
    }
})
router.get('/getLPNumber', async (req, res, next) => {
    try {
        result = await ParkingSpots.findOne({ spotID: req.body.spotID });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result.licensePlate);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
})
router.get('/isVacated', async (req, res, next) => {
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
})
router.get('/userProfile', async (req, res, next) => {
    // userProfile(licensePlate)-> userProfile
})
router.get('/getTimeSpent', async (req, res, next) => {
    // getTimeSpent(licensePlate/userProfile)
})

module.exports = router;
