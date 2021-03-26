const express = require('express');
const app = require('../app');
const Cameras = require('../models/cameras');
const ParkingSpots = require('../models/parkingSpots');
const setupRouter = express.Router();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const multer = require('multer');
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');
var fs = require('fs');
var path = require('path');
// var multer = require('multer');
const logger = require('../logger');

 // //upload image helper
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });

// var upload = multer({ storage: storage });

//imageupload helpers

const storage = new GridFsStorage({
    url: "mongodb+srv://smartCarPark:fyp2021@carparkcluster.lnhjd.mongodb.net/carpark-db?retryWrites=true&w=majority",
    file: (req , file) => {
      return new Promise((resolve, reject) =>{
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
        //   buf.toString('hex') + path.extname(file.originalname)
          const filename = 'hello.jpg';
          console.log(req.body);
          const fileInfo = {
            filename: filename,
            fileID: req.fileID,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  
var upload = multer({ storage });

const url = "mongodb+srv://smartCarPark:fyp2021@carparkcluster.lnhjd.mongodb.net/carpark-db?retryWrites=true&w=majority";
const connect = mongoose.createConnection(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let gfs; 

connect.once('open', ()=>{
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: "uploads"
    });
});
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
            setupImg: null
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
            setupImg: null
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
 * @param {string} mac MAC address of the Camera RasPi
 * @param {string} name
 * @param {string} description?
 * @param {Object} setupImage
 * 
 * This is currently not completely tested and will be 
 * finished along with the front-end demo
 */

setupRouter.post('/addCameraImage', upload.single('file'), (req, res, next) => {
        console.log(req.body);
        
        let newImage = new Image({
            caption: req.body.caption,
            filename: req.file.filename,
            fileId: req.file.id,
        });

        newImage.save()
            .then((image) => {
                res.status(200).json({
                    success: true,
                    image,
                });
            }).catch(err=> res.status(500).json(err));
    //     let camera = await Cameras.findOne({ mac: req.body.mac });
    //     console.log(camera);
    //     var img = {
    //         name: req.body.name,
    //         desc: req.body.desc,
    //         img: {
    //             data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
    //             contentType: 'image/png'
    //         }
    //     }
    //     console.log(img);
    //     result = await camera.setupImg.create(img);
    //     console.log(result);
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'application/json');
    //     res.json(result);
    // } catch (err) {
    //     console.error(err);
    // }
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
    console.log(req.body.boundingBox)
    try {
        result = await ParkingSpots.findOne({ spotID: req.body.spotID }, function (err, doc) {
            //doc.spotID = req.body.spotID,
            //doc.cameraID = req.body.cameraID,
            //doc.vacant = req.body.vacant,
            //doc.licensePlate = req.body.licensePlate,
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
    gfs.find({filename: req.params.filename }).toArray((err,files) => {
        if (!files[0]||files.length === 0){
            return res.status(200).json({
                success: false,
                message: 'No Files Available'
            });
        }

        if (files[0].contentType === 'image/jpeg'
            || files[0].contentType === 'image/png'
            || files[0].contentType === 'image/svg+xml'){
                gfs.openDownloadStreamByName(req.params.filename).pipe(res);
            } else {
                res.status(404).json({
                    err: 'Not an image',
                });
            }

    });
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


