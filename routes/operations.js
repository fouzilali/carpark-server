var express = require("express");
const logger = require("../logger");
var router = express.Router();
const ParkingSpots = require("../models/parkingSpots");
const pointInQuad = require("../pointInQuad");

async function whichSpot(lpr, mac) {
    // {
    //     'lp': lp,
    //     'x': xywh[0],
    //     'y': xywh[1],
    //     'w': xywh[2],
    //     'h': xywh[3],
    // }
    let spots = await ParkingSpots.find({})
    // let spots = await ParkingSpots.find({mac: mac})
        .select(["spotID", "boundingBox"])
        .exec();
    return spots.find(spot => {
        logger.info(spot);
        const bbox = spot.boundingBox;
        const id = spot.spotID;
        const inside = pointInQuad(bbox, lpr);
        logger.info("Inside? " + inside);
        return inside;
    }).spotID;
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
        let spotID = req.body.spotID; // TODO: change to coordinate mapping
        spotID = await whichSpot(req.body, req.body.mac);
        // if (spotID === null) {
        //     // OOPS
        //     return;
        // }
        // const spotID =
        result = await ParkingSpots.findOne(
            { spotID: spotID },
            async (err, doc) => {
                doc.vacant = false;
                doc.licensePlate = req.body.lp;
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
            { licensePlate: req.body.lp },
            async (err, doc) => {
                doc.vacant = true;
                doc.licensePlate = null;
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

router.get('/allSpots', async (req, res, next) => {
    try {
        console.log("called")
        result = await ParkingSpots.find({});
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
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
