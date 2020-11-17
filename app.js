var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

var db = require('./database')

var views = require('./views/views');
views(app);

app.use(logger('dev'));
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
  console.log(`Example app listening at http://localhost:${port}`)
})
