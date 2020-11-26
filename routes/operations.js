var express = require('express');
var router = express.Router();

// TODO: 'operation' stage API functions

router.put('/spotFilled', function (req, res, next) {
    // spotFilled(CameraID, LPNumber, PixelLocation, time)
    try{
        result  = await  ParkingSpots.findOne({spotID : req.body.spotID}, function(err, doc){
            doc.spotID = req.body.spotID;
            doc.cameraID = req.body.cameraID;
            doc.vacant = false;
            doc.licensePlate = req.body.licensePlate;
            doc.boundingBox = req.body.boundingBox;
            doc.save();
        }); 
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    }catch(err){
        console.error(err);
        res.json(err);
    }
})
router.put('/spotVacated', function (req, res, next) {
    // spotVacated(CameraID, PixelLocation, time)
    try{
        result  = await  ParkingSpots.findOne({spotID : req.body.spotID}, function(err, doc){
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
    }catch(err){
        console.error(err);
        res.json(err)
    }
})

router.get('/isFilled', function (req, res, next) {
    try{
        result  = await  ParkingSpots.findOne({spotID: req.body.spotID}); 
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(!(result.vacant));
    }catch(err){
        console.error(err);
        res.json(err);
    }
})
router.get('/getLPNumber', function (req, res, next) {
    try{
        result  = await  ParkingSpots.findOne({spotID: req.body.spotID}); 
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result.licensePlate);
    }catch(err){
        console.error(err);
        res.json(err);
    }})
router.get('/isVacated', function (req, res, next) {
    // isVacated(ParkingSpot) -> bool
    try{
        result  = await  ParkingSpots.findOne({spotID: req.body.spotID}); 
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result.vacant);
    }catch(err){
        console.error(err);
        res.json(err);
    }
})
router.get('/userProfile', function (req, res, next) {
    // userProfile(licensePlate)-> userProfile
})
router.get('/getTimeSpent', function (req, res, next) {
    // getTimeSpent(licensePlate/userProfile)
})

module.exports = router;
