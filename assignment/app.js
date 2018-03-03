// var express = require('express');
// var app = express();
// require("../assignment/app.js")(app);
// app.listen(port, ipaddress);
//

module.exports = function (app) {
  /* Api CALLS*/
  app.get('/api/test/', function (req,res) {
    console.log("message from app.js")
    res.send('hello world')
  });

  // require("./assignment/app.js")(app);
  // app.listen(port, ipaddress);


}
