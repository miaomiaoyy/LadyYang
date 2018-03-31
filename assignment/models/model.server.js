
// var db = mongoose.connect('mongodb://localhost:27017/webdev');
// var db = mongoose.connect('mongodb://yang:224@ds217349.mlab.com:17349/heroku_93x3fp0h');

// 'mongodb://jielu:jielumangodb1@ds263847.mlab.com:63847/heroku_5b7815xd'
// module.exports = db;

module.exports = function () {
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost:27017/test');
 //mongoose.connect('mongodb://jielu:jielumangodb1@ds263847.mlab.com:63847/heroku_5b7815xd');
  // var db = mongoose.connect('mongodb://localhost:27017/test', function (err, db) {
  //   console.log("yudong mongo", err, db);
  // });

  // mongoose.connect("mongodb://yudong:yudong@ds033086.mlab.com:33086/yudong");
  // mongoose.connect("mongodb://localhost/wam-fall-2017");

  var UserModel = require("./user/user.model.server")();
  var WebsiteModel = require("./website/website.model.server")();
  var PageModel = require("./page/page.model.server")();
  var WidgetModel = require("./widget/widget.model.server")();


  var model = {
    UserModel: UserModel,
    WebsiteModel: WebsiteModel,
    PageModel: PageModel,
    WidgetModel: WidgetModel
  };


  UserModel.setModel(model);
  WebsiteModel.setModel(model);
  PageModel.setModel(model);
  WidgetModel.setModel(model);

  return model;
};
