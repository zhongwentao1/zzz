var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/login', function (req, res, next) {
    res.send(`你在访问测试接口,用户名:${req.body.username},密码:${req.body.password}`);
});
module.exports = router;