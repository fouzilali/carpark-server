var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('./logger.js');
var fs = require('fs');

var app = express();

var mongoose = require('mongoose');

//Setup Database
const url = "mongodb+srv://smartCarPark:fyp2021@carparkcluster.lnhjd.mongodb.net/carpark-db?retryWrites=true&w=majority";
const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
connect.then((db) => {
  console.log(`DB: Connected to ${url}`);
}, (err) => { console.log(err); });

const Cameras = require('./models/cameras');
const parkingSpots = require('./models/parkingSpots');




var views = require('./views/views');
views(app);

var requestLogger = require('morgan');
app.use(requestLogger('dev'));
app.use(requestLogger('common', {
  stream: fs.createWriteStream('./requests.log', { flags: 'a' })
}));
// var winston = require('winston'), expressWinston = require('express-winston');
// app.use(expressWinston.logger({
//   winstonInstance: logger,
//   expressFormat: true
// }))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var routers = require('./routes/routers');
routers(app);

var error_handlers = require('./error_handler');
error_handlers(app);

module.exports = app;

const port = 3000;
app.listen(port, () => {
  logger.info(`Example app listening at http://localhost:${port}`)
})
