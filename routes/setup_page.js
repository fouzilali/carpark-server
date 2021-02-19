const express = require('express');
const app = require('../app');
const Cameras = require('../models/cameras');
const ParkingSpots = require('../models/parkingSpots');
const setupRouter = express.Router();
const mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var multer = require('multer');
const logger = require('../logger');

//upload image helper
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

/**
 * This function is for adding camera's to the server's
 * database of connected cameras
 * @param {string} CameraID
 * @param {Array} spotIDs
 * @param {boolean} active?
 * @param {Object} setupImage
 * @returns {Object} Camera  
 */

setupRouter.post('/announceCamera', async(req,res, next) => {
    try {
        let cam = {
            cameraID: req.body.mac,
            mac: req.body.mac,
            isActive: req.body.isActive,
            setupImg: req.body.setupImg
        }
        result = await Cameras.create(cam);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    } catch (err) {
        console.error(err);
        res.json(err)
    }
});

setupRouter.post('/addCamera', async (req, res, next) => {
    try {
        let cam = {
            cameraID: req.body.cameraID,
            parkingSpots: req.body.parkingSpots,
            isActive: req.body.isActive,
            setupImg: req.body.setupImg
        }
        result = await Cameras.create(cam);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    } catch (err) {
        console.error(err);
        res.json(err)
    }
});

/**
 * This function is for sending the image to the server
 * from the raspberry pi
 * @param {string} CameraID
 * @param {string} name
 * @param {string} description?
 * @param {Object} setupImage
 * 
 * This is currently not completely tested and will be 
 * finished along with the front-end demo
 */
setupRouter.post('/addCameraImage', upload.single('image'), async (req, res, next) => {
    try {
        let camera = await Cameras.findOne({ cameraID: req.body.cameraID });
        var img = {
            name: req.body.name,
            desc: req.body.desc,
            img: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
        }
        camera.setupImg.create(img);
    } catch (err) {
        console.error(err);
    }
});

/**
 * This function is for adding parking spots to the 
 * parking spot database
 * @param {string} CameraID
 * @param {string} spotIDs
 * @param {boolean} vacant?
 * @param {Object} licensePlate
 * @param {Object} boundingBox_edges
 * @returns {Object} Camera  
 */
setupRouter.post('/addParkingSpot', async (req, res, next) => {
    try {
        let ps = {
            spotID: req.body.spotID,
            cameraID: req.body.cameraID,
            vacant: req.body.vacant,
            licensePlate: req.body.licensePlate,
            boundingBox: req.body.boundingBox
        };
        result = await ParkingSpots.create(ps);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    } catch (err) {
        console.error(err);
        res.json(err)
    }
});

/**
 * This function is for updating the parking spots 
 * dedicaed to an existing camera
 * @param {string} CameraID
 * @param {Array} added_spotIDs
 * @returns {Object} Camera  
 */
setupRouter.put('/updateCamera', async (req, res, next) => {
    try {
        result = await Cameras.findOne({ cameraID: req.body.cameraID }, function (err, doc) {
            doc.parkingSpots.push(req.body.addedParkingSpots);
            doc.save();
        });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    } catch (err) {
        console.error(err);
        res.json(err)
    }
});

/**
 * This function is for updating the information 
 * of an existing parking spot
 * @param {string} CameraID
 * @param {string} spotIDs
 * @param {boolean} vacant?
 * @param {Object} licensePlate
 * @param {Object} boundingBox_edges
 * @returns {Object} Camera    
 */
setupRouter.put('/updateParkingSpot', async (req, res, next) => {
    try {
        result = await ParkingSpots.findOne({ spotID: req.body.spotID }, function (err, doc) {
            doc.spotID = req.body.spotID,
                doc.cameraID = req.body.cameraID,
                doc.vacant = req.body.vacant,
                doc.licensePlate = req.body.licensePlate,
                doc.boundingBox = req.body.boundingBox
            doc.save();
        });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    } catch (err) {
        console.error(err);
        res.json(err)
    }
});

/**
 * This function is for updating the information 
 * of an existing parking spot
 * @param {string} CameraID
 * @param {string} spotIDs
 * @param {boolean} vacant?
 * @param {Object} licensePlate
 * @param {Object} boundingBox_edges
 * @returns {Object} Camera    
 */
setupRouter.put('/updateCameraStatus', async (req, res, next) => {
    try {
        result = await Cameras.findOne({ cameraID: req.body.cameraID }, function (err, doc) {
            doc.isActive = req.body.isActive;
            doc.save();
            return doc;
        });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    } catch (err) {
        console.error(err);
        res.json(err)
    }
});

/**
 * This function is for deleting a camera from the 
 * list of connected cameras
 * @param {string} CameraID
 */
setupRouter.delete('/deleteCamera', async (req, res, next) => {
    try {
        result = await Cameras.deleteOne({ cameraID: req.body.cameraID });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
});

/**
 * This function is for deleting a parking spot from the 
 * camera it is connected to 
 * @param {string} spotID
 */
setupRouter.delete('/deleteSpot', async (req, res, next) => {
    try {
        result = await ParkingSpots.deleteOne({ spotID: req.body.spotID });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
});

/**
 * This function is for getting a camera
 * from the existing list of cameras
 * @param {string} CameraID
 * @returns {Object} camera
 */
setupRouter.get('/getCamera', async (req, res, next) => {
    try {
        result = await Cameras.findOne({ cameraID: req.body.cameraID });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
});

/**
 * This function is for getting a parkingSpot from 
 * the existing list of parking spots
 * @param {string} spotID
 * @returns {Object} parkingSpot
 */

setupRouter.get('/getParkingSpot', async (req, res, next) => {
    try {
        result = await ParkingSpots.findOne({ spotID: req.body.spotID });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    } catch (err) {
        console.error(err);
        res.json(err)
    }
});

setupRouter.get('/allSpots', async (req, res, next) => {
    try {
        console.log("called")
        result = await ParkingSpots.find({});
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.json(result);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
});

/**
 * This function is for getting the image view of 
 * a camera
 * @param {string} CameraID
 * @returns {Object} camera_Image
 */

setupRouter.get('./getCameraImage', async (req, res, next) => {
    try {
        result = await Cameras.findOne({ cameraID: req.body.cameraID });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result.setupImg);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
});

/**
 * This function is for getting the status of 
 * a camera
 * @param {string} CameraID
 * @returns {Object} camera
 */

setupRouter.get('/getCameraStatus', async (req, res, next) => {
    try {
        result = await Cameras.findOne({ cameraID: req.body.cameraID });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result.isActive);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
});

module.exports = setupRouter;


