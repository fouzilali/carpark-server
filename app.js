var express = require("express");
var WebSocket = require("ws");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("./logger.js");
var fs = require("fs");
const methodOverride = require("method-override");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

var app = express();
var server = require("http").createServer(app);
const wss = new WebSocket.Server({ server: server });

app.use(cors());

var mongoose = require("mongoose");
app.use(methodOverride("_method"));

//Setup Database
const url =
    "mongodb+srv://smartCarPark:fyp2021@carparkcluster.lnhjd.mongodb.net/carpark-db?retryWrites=true&w=majority";
const connect = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
connect.then(
    db => {
        console.log(`DB: Connected to ${url}`);
    },
    err => {
        console.log(err);
    }
);

//Setup image storage
const Cameras = require("./models/cameras");
const parkingSpots = require("./models/parkingSpots");

var views = require("./views/views");
views(app);

var requestLogger = require("morgan");
app.use(requestLogger("dev"));
app.use(
    requestLogger("common", {
        stream: fs.createWriteStream("./requests.log", { flags: "a" }),
    })
);

//Websocket for Raspberry Pi connection

wss.on("connection", function connection(ws) {
    console.log("A new Camera has been anounced");
    ws.send("Welcome New Client");

    ws.on("message", function incoming(message) {
        console.log("received: %s", message);
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var routers = require("./routes/routers");
routers(app);

var error_handlers = require("./error_handler");
const hostname = require("./hostname.js");
error_handlers(app);

module.exports = app;

const port = process.env.PORT || "12000";
server.listen(port, () => {
    logger.info(`Example app listening at http://${hostname}:${port}`);
});
