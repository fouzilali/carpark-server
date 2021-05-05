var express = require("express");
const logger = require("../logger");
const Cameras = require("../models/cameras");
var router = express.Router();
const ParkingSpots = require("../models/parkingSpots");
const pointInQuad = require("../pointInQuad");
const { startAllCameras, stopAllCameras } = require("../websock.js");

async function whichSpot(lpr, mac) {
    // {
    //     'lp': lp,
    //     'x': xywh[0],
    //     'y': xywh[1],
    //     'w': xywh[2],
    //     'h': xywh[3],
    // }
    // var spots = await ParkingSpots.find({cameraID: mac}, {spotID: 1, boundingBox: 1}).exec();
    let camera = await Cameras.findOne({ mac: mac })
        .select(["cameraID"])
        .exec();
    let spots = await ParkingSpots.find({ cameraID: camera.cameraID })
        .select(["spotID", "boundingBox"])
        .exec();

    return spots.find(spot => {
        const bbox = spot.boundingBox;
        const id = spot.spotID;
        const inside = pointInQuad(bbox, lpr);
        return inside;
    });
}

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
router.put("/spotFilled", async (req, res, next) => {
    try {
        spot = await whichSpot(req.body, req.body.mac);
        console.log(spot.spotID);
        spot.vacant = false;
        spot.lpNumber = req.body.lp;
        spot.timeEntered = new Date();
        await spot.save().then(saved => {
            if (saved !== spot) {
                throw Error("Failure during saving of Parking Spot document");
            }
        });

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
});

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
router.put("/spotVacated", async (req, res, next) => {
    try {
        result = await ParkingSpots.findOne(
            { lpNumber: req.body.lp },
            async (err, doc) => {
                doc.vacant = true;
                doc.lpNumber = null;
                doc.save();
            }
        );
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
});

/**
 * This function is for checking if a particular spot
 * is filled
 * @param {string} spotID
 * @returns {boolean} filled?
 */
router.get("/isFilled", async (req, res, next) => {
    try {
        result = await ParkingSpots.findOne({ spotID: req.body.spotID });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(!result.vacant);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
});

/**
 * This function is for getting the license plate number of
 * a parked car
 * @param {string} CameraID
 * @param {string} spotID
 * @param {time} time
 * @returns {string} Licence_Plate_number
 */
router.get("/getLPNumber", async (req, res, next) => {
    try {
        result = await ParkingSpots.findOne({ spotID: req.body.spotID });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result.licensePlate);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
});

/**
 * This function is for getting the license plate number of
 * a parked car
 * @param {string} spotID
 * @param {time} time
 * @returns {boolean} vacancy
 */
router.get("/isVacated", async (req, res, next) => {
    // isVacated(ParkingSpot) -> bool
    try {
        result = await ParkingSpots.findOne({ spotID: req.body.spotID });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result.vacant);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
});

router.get("/allSpots", async (req, res, next) => {
    try {
        result = await ParkingSpots.find({});
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
});

router.post("/startAllCameras", async (req, res, next) => {
    try {
        startAllCameras();
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
    } catch (err) {
        console.error(err);
        res.json(err);
    }
});
router.post("/stopAllCameras", async (req, res, next) => {
    try {
        stopAllCameras();
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
    } catch (err) {
        console.error(err);
        res.json(err);
    }
});

// These two are for further features that will be implemented after the initial integration
//with the raspberry pi and front-end.

router.get("/userProfile", async (req, res, next) => {
    // userProfile(licensePlate)-> userProfile
});

router.get("/getTimeSpent", async (req, res, next) => {
    // getTimeSpent(licensePlate/userProfile)
});

module.exports = router;
