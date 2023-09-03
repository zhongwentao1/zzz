const JWT = require('./utils/jwt')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var userLogin = require('./routes/login');

var UserRouter = require('./routes/admin/UserRouter');
var InventoryRouter = require('./routes/inventory/inventoryRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//自己写测试接口
// app.use("/adminapi", userLogin)
/*
adminapi  --后台系统用
webapi  --前台使用

*/
//统一处理 是否检验token
app.use((req, res, next) => {
    if (req.url === '/adminapi/user/login' || req.url === '/adminapi/is_enroll') {
        next();
        return
    } else {
        const token = req.headers["authorization"].split(" ")[1];
        if (token) {
            const payload = JWT.verify(token);
            if (payload) {
                const newToken = JWT.generate({
                    _id: payload._id,
                    username: payload.username
                }, "1d");
                res.header("Authorization", newToken);
                next();
            } else {
                res.status(401).send({
                    code: "401",
                    msg: "token过期"
                })
            }
        }
    }
})
//注册路由
app.use(UserRouter) //用户路由相关
app.use(InventoryRouter) //库存路由相关

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;