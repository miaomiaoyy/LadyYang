module.exports = function (app){
  require("./services/user.service.server")(app);
  require("./services/website.service.server")(app);
  require("./services/page.service.server")(app);
  require("./services/widget.service.server")(app);
  require("./services/cakes.service.server")(app);
  var db = require("./model/models.server");
};



