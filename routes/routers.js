var indexRouter = require("./index");
var usersRouter = require("./users");
var setup_pageRouter = require("./setup_page");
var operationRouter = require("./operations");
var express = require("express");
var path = require("path");

function init_routers(app) {
    const dashPath = path.join(
        __dirname,
        "..",
        "Dash",
        "Source Files",
        "build"
    );
    app.use(express.static(dashPath));
    // app.use('/', indexRouter);
    app.use("/users", usersRouter);
    app.use("/setup", setup_pageRouter);
    app.use("/operation", operationRouter);
    app.use("*", (req, res, next) => {
        res.sendFile(path.join(dashPath, "index.html"));
    });
}

module.exports = init_routers;
