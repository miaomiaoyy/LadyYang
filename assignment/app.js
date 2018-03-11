var express = require('express');
var app = express();
// require("../assignment/app.js")(app);
// app.listen(port, ipaddress);
//
// install, load, and configure body parser module
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports = function (app) {
  var models = require("./model/models.server.js")();
  require("./services/user.service.server.js")(app, models);
  require("./services/website.service.server.js")(app, models);
  require("./services/page.service.server.js")(app, models);
  require("./services/widget.service.server.js")(app, models);
  app.get('/api/test/', function (req,res) {
    console.log("message from app.js")
    res.send('hello world')
  });

  // require("./assignment/app.js")(app);
  // app.listen(port, ipaddress);


}
