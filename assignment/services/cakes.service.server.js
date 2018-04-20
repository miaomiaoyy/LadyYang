

module.exports = function (app) {
  var cakeModel = require('../model/cake/cake.model.server');

  app.post("/api/cakes/cake", createCake);
  app.get("/api/cakes", showCakes);
  app.post("/api/user/cake", createCakeForUser);
  app.get("/api/:userId/cakes", findAllCakesForUser);
  app.get("/api/user/:cid", findCakeById);
  app.post("/api/user/cake", updateCake);
  app.delete("/api/cakes/:cid", deleteCake);
  app.post("/api/cakes/top10", getTop10Cake);
  app.post("/api/cakes/birthday", getBirthdayCake);
  app.get("/api/cakes/cakeCustomization", customizeCake);

  function showCakes(req, res) {
    // cakeModel.showCake().then(function (cakes) {
    //   res.json(cakes);
    // }),
    //   function (error) {
    //   res.sendStatus(400).send('error');
    // };

    cakeModel.showCake()
      .then(function(cakes) {
        res.send(cakes);
      });

    // res.send("Hello from cake service!");

    // webdev.find({}, function (err, cake) {
    //   if (err) {
    //     console.log("error");
    //   } else {
    //     console.log("Pika");
    //     res.render("cakes", {cakes: cake});
    //   }
    // });
  }


  function createCake(req, res) {
    var cake = req.body;
    //var user = req.body;
    //var userId = req.params['userId'];

    cakeModel.createCake(cake).then(function (newCake) {
      console.log("cake service1");
      res.send(newCake);
    })
      , function (error) {
      res.sendStatus(400).send(error);
    };
  }

  function customizeCake(req, res) {
    console.log('customize ok');
  }


  function createCakeForUser(req, res) {
    var cake = req.body;
    var userId = req.params['userId'];


    cakeModel.createCakeForUser(userId, cake)
      .then(function (cake) {
        res.json(cake);
      })
      , function (error) {
      res.sendStatus(400).send(error);
    };
  }


  function findAllCakesForUser(req, res) {
    //var user = req.body;
    var userId = req.params['userId'];
    cakeModel.findAllCakesForUser(userId)
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


  function getTop10Cake(req, res) {
    cakeModel.showCake().then(
      function (cake) {
        res.json(cake);
        console.log('showcake2');
      },
      function (error) {
        console.log('showcake err2');
        res.sendStatus(400).send(error);
      }
    );
    // cakeModel.findTop10()
    //   .then(
    //     function (cakes) {
    //       res.send(cakes);
    //     },
    //     function (error) {
    //       res.sendStatus(400).send(error);
    //     }
    //   );
  }


  function getBirthdayCake(req, res) {
    cakeModel.showCake().then(
      function (cake) {
        console.log('showcake1');
        res.json(cake);
      },
      function (error) {
        console.log('showcake err1');
        res.sendStatus(400).send(error);
      }
    );
    // cakeModel.findBirthday()
    //   .then(
    //     function (cakes) {
    //       res.send(cakes);
    //     },
    //     function (error) {
    //       res.sendStatus(400).send(error);
    //     }
    //   );
  }
}
