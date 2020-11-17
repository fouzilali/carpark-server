var indexRouter = require('./index');
var usersRouter = require('./users');

function init_routers(app) {
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
}

module.exports = init_routers;