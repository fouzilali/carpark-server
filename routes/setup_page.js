const express = require('express');
const app = require('../app');
const Cameras = require('../models/cameras');
const ParkingSpots = require('../models/parkingSpots');
const setupRouter = express.Router();
const mongoose = require('mongoose');
// TODO: 'setup' page

//update the imiage part
setupRouter.post('/addCamera', async(req,res,next) =>{
    try{
        console.log(mongoose.connection.readyState)
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
        res.json(err).send
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
        res.json(err).send
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
        res.json(err).send
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
        res.json(err).send
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
        res.json(err).send
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
        res.json(err).send
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
        res.json(err).send
    }
});




module.exports = setupRouter;


