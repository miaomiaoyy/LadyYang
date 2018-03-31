module.exports = function (app, model) {

  var WebsiteModel = require('../models/website/website.model.server');

  app.post('/api/user/:userId/website', createWebsite);
  app.get('/api/user/:userId/website', findAllWebsitesByUser);
  app.get('/api/website/:websiteId', findWebsiteById);
  app.put('/api/website/:websiteId', updateWebsite);
  app.delete('/api/website/:websiteId', deleteWebsite);


  // var websites = [
  //   {'_id': '123', 'name': 'Facebook', 'developerId': '456', 'description': 'HelloKitty'},
  //   {'_id': '234', 'name': 'Twitter', 'developerId': '456', 'description': 'HT'},
  //   {'_id': '456', 'name': 'Bumble', 'developerId': '456', 'description': 'KK'},
  //   {'_id': '890', 'name': 'Go', 'developerId': '123', 'description': 'Hola'},
  //   {'_id': '567', 'name': 'Tic Tac Toe', 'developerId': '123', 'description': 'HelloKitty'},
  //   {'_id': '678', 'name': 'Checkers', 'developerId': '123', 'description': 'YYY'},
  //   {'_id': '789', 'name': 'Chess', 'developerId': '234', 'description': 'TTT'}
  // ];


  function createWebsite(req, res) {
    var userId = req.params['uid'];
    var website = req.body;
    website.developerId = userId;
    model.WebsiteModel.createWebsite(website)
      .then(function (website) {
        res.json(website);
      }
      ,
        function(error) {
          res.json(error);
      });
  }


  function findAllWebsitesByUser(req, res) {
    var userId = req.param['uid'];
    model.WebsiteModel.findWebsitesForUser(userId)
      .then(function (websites) {
          res.json(websites)
        },
        function (error) {
          res.send(404).send(error);
        });
  }


  function findWebsiteById(req, res) {
    var websiteId = req.params['wid'];
    model.WebsiteModel.findWebsiteById(websiteId)
      .then(
        function(website) {
          res.send(website);
        },
        function(error) {
          res.sendStatus(400).send(error);
        }
      );
  }

  // function updateWebsite(req, res) {
  //   var websiteId = req.params['websiteId'];
  //   var website = req.body;
  //   console.log(website);
  //   for (const i in websites) {
  //     if (websites[i]._id === websiteId) {
  //       websites[i].name = website.name;
  //       websites[i].developerId = website.developerId;
  //       websites[i].description = website.description;
  //       res.json(websites[i]);
  //       return;
  //     }
  //   }
  // }


  function updateWebsite(req, res) {
    var userId = req.param['uid'];
    var websiteId = req.param['wid'];
    var newWebsite = req.body;
    model.WebsiteModel.updateWebsite(websiteId, newWebsite)
      .then(
        function (website) {
          res.json(website);
        }
        , function (error) {
          res.send(404).send(error);
        });
  }

  function deleteWebsite(req, res) {
    var websiteId = req.params['wid'];
    model.WebsiteModel.deleteWebsite(websiteId)
      .then(function (website) {
        res.json(website);
      });
  }
}



//
// module.exports = function(app){
//   var WEBSITES = require("./website.mock.server");
//
//   app.get("/api/user/:userId/website", findWebsiteForUser);
//   app.post("/api/user/:userId/website", createWebsite);
//   app.delete("/api/user/:userId/website/:websiteId", deleteWebsite);
//   app.get("/api/user/:userId/website/:websiteId", findWebsiteById);
//   app.put("/api/user/:userId/website/:websiteId", updateWebsiteById);
//
//   var websiteModel = require('../models/website/website.model.server');
//
//   function updateWebsiteById(req, res){
//     var userId = req.params['userId'];
//     var websiteId = req.params['websiteId'];
//     var newWebSite = req.body;
//     for(var i = 0; i < WEBSITES.length; i++) {
//       if (WEBSITES[i]._id === websiteId) {
//         WEBSITES[i] = newWebSite;
//         break;
//       }
//     }
//     res.json(getWebsitesForUserId(userId));
//   }
//
//   function findWebsiteById(req, res){
//     var user = req.params['userId'];
//     var websiteId = req.params['websiteId'];
//     res.json(getWebsiteById(websiteId));
//   }
//
//   function deleteWebsite(req, res){
//     var userId = req.params['userId'];
//     var websiteId = req.params['websiteId'];
//     for(var i = 0; i < WEBSITES.length; i++) {
//       if (WEBSITES[i]._id === websiteId) {
//         WEBSITES.splice(i, 1);
//         var websites = getWebsitesForUserId(userId);
//         res.json(websites);
//         return;
//       }
//     }
//
//   }
//
//   function createWebsite(req, res){
//     var userId = req.params['userId'];
//     var website = req.body;
//     website.developerId = userId;
//     delete website._id;
//     websiteModel.createWebsite(website)
//       .then(function (website){
//         websiteModel.findWebsitesForUser(userId)
//           .then(function (websites){
//             res.json(websites);
//           })
//       }, function(err){
//         console.log(err);
//       });
//   }
//
//   function findWebsiteForUser(req, res) {
//     var userId = req.params['userId'];
//     websiteModel.findWebsitesForUser(userId)
//       .then(function(websites){
//         res.json(websites);
//       })
//     // var websites= getWebsitesForUserId(userId);
//     // res.json(websites);
//   }
//
//   function  getWebsitesForUserId(userId) {
//     var websites=[];
//
//     for(var i = 0; i < WEBSITES.length; i++) {
//       if (WEBSITES[i].developerId === userId) {
//         websites.push(WEBSITES[i]);
//       }
//     }
//     return websites;
//   }
//
//   function getWebsiteById(websiteId){
//     for(var i = 0; i < WEBSITES.length; i++) {
//       if (WEBSITES[i]._id === websiteId) {
//         return WEBSITES[i];
//       }
//     }
//   }
// }

