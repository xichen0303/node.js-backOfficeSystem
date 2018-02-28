var express = require('express');
var router = express.Router();
var UserModel = require("../model/UserModel");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  res.render('home', {});
});

router.get('/top', function(req, res, next) {
  res.render('top', {});
});

router.get('/left', function(req, res, next) {
  res.render('left', {});
});

router.get('/right', function(req, res, next) {
  res.render('right', {});
});

router.get('/goodslist', function(req, res, next) {
  res.render('goodslist', {});
});

router.post("/api/login", function(req, res) {
	var username = req.body.username;
	var psw = req.body.psw;

	var result = {
		status: 1,
		message: "登陆成功"
	}
	UserModel.find({username: username, psw: psw}, function(err, docs){
		if(!err && docs.length > 0) {
			console.log("登陆成功");
			res.send(result);
		} else {
			console.log("登录失败,请检查您的用户名或密码");
			result.status = -109;
			result.message = "登录失败,请检查您的用户名或密码";
			res.send(result);
		}
	})
})
module.exports = router;
