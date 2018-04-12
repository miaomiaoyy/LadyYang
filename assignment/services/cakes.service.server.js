

module.exports = function (app) {
  var cakeModel = require('../model/cake/cake.model.server');

  app.post("/api/cakes", showCakes);


  function showCakes(req, res) {
    res.send("Hello from cake service!");
    // webdev.find({}, function (err, cake) {
    //   if (err) {
    //     console.log("error");
    //   } else {
    //     console.log("Pika");
    //     res.render("cakes", {cakes: cake});
    //   }
    // });
  };
}
