

module.exports = function (app) {
  var cakeModel = require('../model/cake/cake.model.server');

  app.post("/api/cakes/new", createCake);
  app.get("/api/cakes", showCakes);

  function showCakes(req, res) {
    cakeModel.showCake().then(function (cakes) {
      res.json(cakes);
    });
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


function createCake(req, res) {
  var cake = req.body;
  cakeModel.createCake(cake).then(function(newCake){
    res.send(newCake);
  },
    function (error) {
      res.sendStatus(400).send(error);
    });
}
