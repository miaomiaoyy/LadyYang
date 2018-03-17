
module.exports = function (app) {
  //var models = require("./model/models.server.js")();

  //require("./test-service/user.service.server")(app);
  // require("./service/page.service.server")(app);
  // require("./service/website.service.server")(app);
  // require("./service/widget.service.server")(app);

  // console.log("in app.js file!");
  require("./test-service/user.service.server")(app);
  require("./test-service/page.service.server")(app);
  require("./test-service/website.service.server")(app);
 // require("./test-service/widget.service.server")(app);
  //var db = require("./models/model";
};
