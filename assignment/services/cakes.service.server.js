
var shoppingCartModel = require('../model/shoppingcart/shoppingcart.model.server');
module.exports = function (app) {
  var cakeModel = require('../model/cake/cake.model.server');

  app.post("/api/cakes/cake", createCake);
  app.get("/api/cakes", showCakes);
  app.get("/api/:uid/cakes",showCakes);
  app.post("/:uid/cakes/:cid",addCakeToUser);
  app.post("/api/user/cake", createCakeForUser);
  app.get("/api/:uid/cakes", findAllCakesForUser);
  app.get("/api/cake/:cid", findCakeById);
  app.post("/api/user/cake", updateCake);
  app.delete("/api/cakes/:cid", deleteCake);
  app.post("/api/cakes/top10", getTop10Cake);
  app.post("/api/cakes/birthday", getBirthdayCake);
  app.get("/api/cakes/cakeCustomization", customizeCake);
  app.get("/api/cake/pic/:cid", getPicture);

  function showCakes(req, res) {
    // cakeModel.showCake().then(function (cakes) {
    //   res.json(cakes);
    // }),
    //   function (error) {
    //   res.sendStatus(400).send('error');
    // };
    var userId = req.params['userId'];
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

  function addCakeToUser(req, res) {
    var cake = req.body;
    var user = req.body;

    shoppingCartModel.addToShoppingCart(cake, user)
      .then(function (data, err) {
        if (data) {
          console.log(cake,"add cake to user ok");
          res.json(data);
          res.send(200);
        } else {
          console.log(cake,"add cake to user fail");
          res.send(404)
        }
      });
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


  function getPicture(req, res) {
    var cid = req.param['cid'];
    cakeModel.findPic(cid).then(
      function (image) {
        console.log('picture find cake', image);
        res.json(image);
      }
    )
  }


  function findCakeById(req, res) {
    var cakeId = req.params['cid'];
    // console.log('step3, get cake Id', cakeId);
    cakeModel.findCakeById(cakeId)
      .then(
        function (cake) {
          console.log('step3, find cake', cake);
            var copy = Object.assign({}, cake);
          console.log(copy, 'step 3');
         // res.send(copy);
          res.json(copy);
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
