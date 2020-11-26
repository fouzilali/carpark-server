var express = require('express');
var router = express.Router();

// TODO: 'setup' stage API functions

router.post('/addCamera', function (req, res, next) {
    // addCamera(CameraID, ParkingSpotsCovered)
});
router.post('/addParkingSpot', function (req, res, next) {
    // addParkingSpot(CameraID, ParkingSpotBoundingBox,Physical Identifier)
});
router.put('/updateCamera', function (req, res, next) {
    // updateCamera(CameraID, parkingSpotsCovered)
});
router.put('/checkCameraStatus', function (req, res, next) {
    // checkCameraStatus(CameraID)
});
router.put('/updateParkingSpot', function (req, res, next) {
    // updateParkingSpot(parkingSpot, ParkingSpotBoundingBox, Physical Identifier, CameraID)
});
router.delete('/removeCamera', function (req, res, next) {
    // removeCamera(CameraID)
});
router.delete('/parkingSpot', function (req, res, next) {
    // parkingSpot(parkingSpot)
});
router.get('/getSetupImage', function (req, res, next) {
    // getSetupImage(CameraID)-> image from camera
});
router.get('/getCamera', function (req, res, next) {
    // getCamera(CameraID)-> camera record
});
router.get('/getParkingSpot', function (req, res, next) {
    // getParkingSpot(parkingSpot) -> parkingSpotRecord
});

router.post('/newSetupImage', function (req, res, next) {
    // newSetupImage(CameraID, Image)
});

module.exports = router;
