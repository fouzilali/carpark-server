const express = require('express');
const app = require('../app');
const Cameras = require('../models/cameras');
const ParkingSpots = require('../models/parkingSpots');
const setupRouter = express.Router();
const mongoose = require('mongoose');
var fs = require('fs'); 
var path = require('path'); 
var multer = require('multer');
// TODO: 'setup' page

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

setupRouter.post('/addCamera', async(req,res,next) =>{
    try{
        let cam = {
            cameraID: req.body.cameraID,
            parkingSpots: req.body.parkingSpots,
            isActive: req.body.isActive,
            setupImg: req.body.setupImg
        }
        result  = await  Cameras.create(cam); 
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    }catch(err){
        console.error(err);
        res.json(err)
    }
});

setupRouter.post('/addCameraImage', upload.single('image'), async(req, res, next) => {  
    try{
        let camera  = await  Cameras.findOne({cameraID: req.body.cameraID}); 
        var img = { 
            name: req.body.name, 
            desc: req.body.desc, 
            img: { 
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), 
                contentType: 'image/png'
            } 
        }        
        camera.setupImg.create(img);
    }catch(err){
        console.error(err);
    }
}); 

setupRouter.post('/addParkingSpot', async(req,res,next) =>{
    try{
        let ps = {            
                spotID: req.body.spotID,
                cameraID: req.body.cameraID,
                vacant : req.body.vacant,
                licensePlate: req.body.licensePlate,
                boundingBox : req.body.boundingBox
            
        };
        result  = await  ParkingSpots.create(ps); 
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    }catch(err){
        console.error(err);
        res.json(err)
    }
} );

setupRouter.put('/updateCamera', async(req,res,next)=>{
    try{
        result  = await  Cameras.findOne({cameraID : req.body.cameraID}, function(err, doc){
            doc.parkingSpots.push(req.body.addedParkingSpots);
            doc.save();
        }); 
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    }catch(err){
        console.error(err);
        res.json(err)
    }
});

setupRouter.put('/updateParkingSpot', async(req,res,next)=>{
    try{
        result  = await  ParkingSpots.findOne({spotID : req.body.spotID}, function(err, doc){
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
    }catch(err){
        console.error(err);
        res.json(err)
    }
});

setupRouter.put('/updateCameraStatus', async(req,res,next)=>{
    try{
        result  = await Cameras.findOne({cameraID : req.body.cameraID}, function(err, doc){
            doc.isActive = req.body.isActive;
            doc.save();
            return doc;
        }); 
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    }catch(err){
        console.error(err);
        res.json(err)
    }
});

setupRouter.delete('/deleteCamera', async(req,res,next)=>{
    try{
        result  = await Cameras.deleteOne({cameraID : req.body.cameraID}); 
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    }catch(err){
        console.error(err);
        res.json(err)
    }
});

setupRouter.delete('/deleteSpot', async(req,res,next)=>{
    try{
        result  = await ParkingSpots.deleteOne({spotID : req.body.spotID}); 
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    }catch(err){
        console.error(err);
        res.json(err)
    }
});

setupRouter.get('/getCamera',async(req,res,next) =>{
    try{
        result  = await  Cameras.findOne({cameraID: req.body.cameraID}); 
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    }catch(err){
        console.error(err);
        res.json(err)
    }
});

setupRouter.get('/getParkingSpot',async(req,res,next) =>{
    try{
        result  = await  ParkingSpots.findOne({spotID: req.body.spotID}); 
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    }catch(err){
        console.error(err);
        res.json(err)
    }
});

setupRouter.get('./getCameraImage', async(req,res,next)=>{
    try{
        result  = await  Cameras.findOne({cameraID: req.body.cameraID}); 
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result.setupImg);
    }catch(err){
        console.error(err);
        res.json(err)
    }
});

setupRouter.get('/getCameraStatus',async(req,res,next) =>{
    try{
        result  = await  Cameras.findOne({cameraID: req.body.cameraID}); 
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result.isActive);
    }catch(err){
        console.error(err);
        res.json(err)
    }
});



module.exports = setupRouter;


