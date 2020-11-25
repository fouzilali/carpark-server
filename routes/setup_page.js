const express = require('express');
const app = require('../app');
const Cameras = require('../models/cameras')
const setupRouter = express.Router();

// TODO: 'setup' page

setupRouter.post('/addCamera', async(req,res,next) =>{
    try{
        let doc = {
            cameraID: req.body.cameraID,
            parkingSpots: req.body.parkingSpots,
            isActive: req.body.isActive,
            setupImg: req.body.setupImg
        }
        result  = await Cameras.create(doc); 
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    }catch(err){
        console.error(err);
        res.json(err).send
    }
} )
module.exports = setupRouter;


