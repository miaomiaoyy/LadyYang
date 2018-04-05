module.exports = function (app) {

  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

  websites = [
    {_id: "123", name: "Facebook", developerId: "456", description: "Lorem"},
    {_id: "234", name: "Tweeter", developerId: "456", description: "Lorem"},
    {_id: "456", name: "Gizmodo", developerId: "456", description: "Lorem"},
    {_id: "890", name: "Go", developerId: "123", description: "Lorem"},
    {_id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem"},
    {_id: "678", name: "Checkers", developerId: "123", description: "Lorem"},
    {_id: "789", name: "Chess", developerId: "234", description: "Lorem"}
  ];

  function findAllWebsitesForUser(req, res) {
    console.log("server side find all website for user");
    var userId = req.params.userId;
    var websiteSet = [];
    for (var i = 0; i < websites.length; i++) {
      if (websites[i].developerId === userId) {
        websiteSet.push(websites[i]);
      }
    }
    console.log('userId ' + userId + ' has ' + websiteSet.length + ' websites.');
    res.json(websiteSet);
  }

  // function findAllWebsitesForUser(req, res) {
  //   console.log("server side find all website for user");
  //   var userId = req.params.userId;
  //   var resultSet = [];
  //   for (var x = 0; x < websites.length; x++) {
  //     if (websites[x].developerId === userId) {
  //       resultSet.push(websites[x]);
  //     }
  //   }
  //   res.json(resultSet);
  // }


  function createWebsite(req, res) {
    console.log("server side create website");
    var website = req.body;
    var userId = req.params.userId;
    for (var i = 0; i < websites.length; i++) {
      if (websites[i].developerId === userId && websites[i].name === website.name) {
        res.status(404).send("This website is already created");
        return;
      }
    }
    website._id = Math.random().toString();
    website.developerId = userId;
    console.log('number before created = ' + websites.length);
    websites.push(website);
    console.log('number after created = ' + websites.length);
    res.json(website);
  }

  //app.put("/api/website/:websiteId", updateWebsite);
  function updateWebsite(req, res) {
    console.log('server side update website');
    var websiteId = req.params.websiteId;
    var updatedWebsite = req.body;
    for (var i = 0; i < websites.length; i++) {
      if (websiteId == websites[i]._id) {
        websites[i].name = updatedWebsite.name;
        websites[i].description = updatedWebsite.description;
        res.json(updatedWebsite);
      }
    }
    res.status(404).send("website not found");
  }

  function findWebsiteById(req, res) {
    console.log('server side find website by id');
    var websiteId = req.params.websiteId;
    // console.log('come here1');
    for (var i = 0; i < websites.length; i++) {
      // console.log('come here2');
      if (websiteId == websites[i]._id) {
        // console.log('come here3');
        return res.json(websites[i]);
      }
    }
    // console.log('come here4');
    res.status(404).send("website can not be found.");
  }

  function deleteWebsite(req, res) {
    console.log('server side delete website');
    var websiteId = req.params.websiteId;
    for (var i = 0; i < websites.length; i++) {
      if (websites[i]._id == websiteId) {
        res.json(websites[i]);
        console.log('size before = ' + websites.length);
        websites.splice(i, 1);
        console.log('size after = ' + websites.length);
        return;
      }
    }
    res.status(404).send("Website with ID: " + websiteId + " cannot be found");
  }

};


