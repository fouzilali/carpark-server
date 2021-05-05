var path = require("path");

module.exports = function (app) {
    // Setup view engine (Jade)
    app.set("views", __dirname);
    app.set("view engine", "jade");
};
