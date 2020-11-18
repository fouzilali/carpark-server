var express = require('express');
var router = express.Router();

// TODO: 'operation' stage API functions

router.post('/spotFilled', function (req, res, next) {
    // spotFilled(CameraID, LPNumber, PixelLocation, time)
})
router.post('/spotVacated', function (req, res, next) {
    // spotVacated(CameraID, PixelLocation, time)
})

router.get('/isFilled', function (req, res, next) {
    // isFilled(ParkingSpot) -> bool
})
router.get('/getLPNumber', function (req, res, next) {
    // getLPNumber(ParkingSpot) -> licence plate
})
router.get('/isVacated', function (req, res, next) {
    // isVacated(ParkingSpot) -> bool
})
router.get('/userProfile', function (req, res, next) {
    // userProfile(licensePlate)-> userProfile
})
router.get('/getTimeSpent', function (req, res, next) {
    // getTimeSpent(licensePlate/userProfile)
})

module.exports = router;
