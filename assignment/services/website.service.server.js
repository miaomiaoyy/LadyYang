module.exports = function(app) {
  // var WEBSITES = [
  //   {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
  //   {"_id": "234", "name": "Twitter", "developerId": "456", "description": "Lorem"},
  //   {"_id": "456", "name": "Gizmdo", "developerId": "456", "description": "Lorem"},
  //   {"_id": "890", "name": "Go", "developerId": "456", "description": "Lorem"},
  //   {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
  //   {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
  //   {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"},
  // ];
  var websiteModel = require('../model/website/website.model.server');

  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

  function createWebsite(req, res) {
    var userId = req.params['userId'];
    var website = req.body;

    websiteModel.createWebsiteForUser(userId, website)
      .then(function(website) {
        res.json(website);
      });
  }

  function findAllWebsitesForUser(req, res) {
    var userId = req.params['userId'];
    websiteModel.findAllWebsitesForUser(userId)
      .then(
        function(websites) {
        res.json(websites);
      },
        function(error) {
          res.sendStatus(400).send(error);
        });
  }

  function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    websiteModel.findWebsiteById(websiteId)
      .then(
        function(website) {
          res.send(website);
        },
        function(error) {
          res.sendStatus(400).send(error);
        }
      );
  }

  function updateWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var newWebsite = req.body;

    websiteModel.updateWebsite(websiteId, newWebsite)
      .then(
        function(website) {
          res.json(website);
        },
        function(error) {
          res.sendStatus(400).send(error);
        }
      );
  }

  function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    websiteModel.deleteWebsite(websiteId)
      .then(function(status) {
        res.json(status);
      });
  }

};
