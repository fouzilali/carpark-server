var indexRouter = require('./index');
var usersRouter = require('./users');
var setup_pageRouter = require('./setup_page');

function init_routers(app) {
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/setup', setup_pageRouter);
}

module.exports = init_routers;