var express = require('express');
var router = express.Router();
var UserModel = require("../model/UserModel");
var GoodsModel = require("../model/GoodsModel");
var multiparty = require('multiparty');

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


//   商品列表
router.get('/goodslist', function(req, res){
	var pageNo = parseInt(req.query.pageNo || 1);
	var count = parseInt(req.query.count || 15);

	GoodsModel.find({}, function(err, result) {
		var goodsCount = result.length;
		var query = GoodsModel.find({}).skip( (pageNo-1)*count ).limit(count).sort({date: -1});
		query.exec(function(err, docs){
			res.render("goodslist", {list: docs, pageNo: pageNo, count: count, goodsCount: goodsCount});
		});
	})
})
//  商品删除
router.get("/api/goods_del", function(req, res) {
	//  数据库操作
	GoodsModel.findByIdAndRemove({_id: req.query.gid}, function(err) {
		var result = {
				status : 1,
				message: "商品删除成功"
			};
			if( !err ){
				res.send(result);
			} else {
				result.status = -119;
				result.message = "商品删除失败";
				res.send(result);
			}
	})
})

//  商品添加页面
router.post("/api/add_goods", function(req, res) {
	var Form = new multiparty.Form({
		uploadDir: "./public/imgs"
	})
	Form.parse(req, function(err, body, files) {
		var goods_name = body.goods_name[0];
		var goods_num = body.goods_num[0];
		var goods_price = body.goods_price[0];
		var goods_img = files.goods_img[0].path;
		goods_img = goods_img.substr(goods_img.lastIndexOf("\\")+1);

		var gm = new GoodsModel();
		gm.goods_name = goods_name;
		gm.goods_num = goods_num;
		gm.goods_price = goods_price;
		gm.goods_img = goods_img;
		gm.save(function(err){
			var result = {
				status : 1,
				message: "商品保存成功"
			};
			if( !err ){
				res.send(result);
			} else {
				result.status = -110;
				result.message = "商品保存失败";
				res.send(result);
			}
		})
	})
})

//  登录页面
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
