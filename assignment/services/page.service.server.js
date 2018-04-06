module.exports = function (app) {
  // var PAGES = [
  //   {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
  //   {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
  //   {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
  // ];

  var pageModel = require('../model/page/page.model.server');

  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);

  function createPage(req, res) {
    var websiteId = req.params['websiteId'];
    var page = req.body;

    pageModel.createPage(websiteId, page)
      .then(
        function (page) {
        return res.json(page);
      });
  }

  function findAllPagesForWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    pageModel.findAllPagesForWebsite(websiteId)
      .then(
        function (pages) {
          res.json(pages);
        },
        function (error) {
          res.sendStatus(400).send(error);
        }
      );
  }

  function findPageById(req, res) {
    var pageId = req.params['pageId'];
    pageModel.findPageById(pageId)
      .then(
        function (page) {
          res.send(page);
        },
        function (error) {
          res.sendStatus(400).send(error);
        }
      );
  }

  function updatePage(req, res) {
    var pageId = req.params['pageId'];
    var newPage = req.body;

    pageModel.updatePage(pageId, newPage)
      .then(
        function (page) {
          res.json(page);
        },
        function (error) {
          res.sendStatus(400).send(error);
        }
      );
  }

  function deletePage(req, res) {
    var pageId = req.params['pageId'];
    pageModel.deletePage(pageId)
      .then(function (status) {
        res.send(status);
      });
  }
};
