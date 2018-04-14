

module.exports = function (app) {
  var cakeModel = require('../model/cake/cake.model.server');

  app.post("/api/cakes/cake", createCake);
  app.get("/api/cakes", showCakes);
  app.post("api/user/cake", createCakeForUser);
  app.get("api/user/cakes",findAllCakesForUser);
  app.get("api/user/:cid",findCakeById);
  app.post("api/user/cake",updateCake);
  app.delete("/api/cakes/:cid",deleteCake);


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
  var user = req.body;

    cakeModel.createCake(cake).then(function (newCake) {
      console.log("cake service1");
      res.send(newCake);
    })
    , function (error) {
      res.sendStatus(400).send('error');
    };
}


function createCakeForUser(req, res) {
  var cake = req.body;
  var user = req.body;

    cakeService.createCakeForUser(userId, cake)
      .then(function (cake) {
        res.json(cake);
      })
      , function (error) {
      res.sendStatus(400).send('error');
    };
  }



function findAllCakesForUser(req, res) {
  var user = req.body;
  cakeModel.findAllCakesForUser(user._id)
    .then(
      function (cakes) {
        res.json(cakes);
      },
      function (error) {
        res.sendStatus(400).send(error);
      }
    );
}

function findCakeById(req, res) {
  var cakeId = req.params['cid'];
  cakeModel.findPageById(cakeId)
    .then(
      function (page) {
        res.send(page);
      },
      function (error) {
        res.sendStatus(400).send(error);
      }
    );
}

function updateCake(req, res) {
  var cakeId = req.params['cid'];
  var newCake = req.body;

  cakeModel.updateCake(cakeId, newCake)
    .then(
      function (cake) {
        res.json(cake);
      },
      function (error) {
        res.sendStatus(400).send(error);
      }
    );
}

function deleteCake(req, res) {
  var cakeId = req.params['cid'];
  cakeModel.deleteCake(cakeId)
    .then(function (status) {
      res.send(status);
    });
};
