
module.exports = function (app) {
  //var models = require("./model/models.server.js")();
var mongoose = require('mongoose');
  //require("./test-service/user.service.server")(app);
  // require("./service/page.service.server")(app);
  // require("./service/website.service.server")(app);
  // require("./service/widget.service.server")(app);

  // console.log("in app.js file!");
  console.log("hello from app.jQuery");

  mongoose.connect('mongodb://localhost:27017/test');
  var model = require("./models/model.server")();
  require("./test-service/user.service.server")(app, model);
  require("./test-service/page.service.server")(app, model);
  require("./test-service/website.service.server")(app, model);
  require("./test-service/widget.service.server")(app, model);
  //var db = require("./models/model";
};
