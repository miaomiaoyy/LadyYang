module.exports = function (app) {

  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);

  var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
    { "_id": "654", "name": "Post 1", "websiteId": "890", "description": "Lorem" },
    { "_id": "765", "name": "Post 2", "websiteId": "890", "description": "Lorem" },
    { "_id": "876", "name": "Post 3", "websiteId": "890", "description": "Lorem" }
  ];

  function createPage(req, res) {
    var websiteId = req.params["websiteId"];
    var page = req.body;
    const new_page = {
      _id: (new Date()).getTime() + '',
      name: page.name,
      websiteId: websiteId,
      description: page.description
    };
    pages.push(new_page);
    res.json(new_page);
  }

  function findAllPagesForWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    var pagesByWebsiteId = pages.filter(function(page) {
      return page.websiteId === websiteId;
    });
    res.json(pagesByWebsiteId);
  }

  function findPageById(req, res) {
    var pageId = req.params["pageId"];
    var page = pages.find(function(page) {
      return page._id === pageId;
    });
    res.json(page);
  }

  function updatePage(req, res) {
    var pageId = req.params["pageId"];
    var page = req.body;
    for (const i in pages) {
      if (pages[i]._id === pageId) {
        pages[i].name = page.name;
        pages[i].websiteId = page.websiteId;
        pages[i].description = page.description;
        res.json(pages[i]);
        return;
      }
    }
  }

  function deletePage(req, res) {
    var pageId = req.params["pageId"];
    pages.splice(pages.findIndex(function(page) {
      return page._id === pageId;
    }), 1);
    res.json({});
  }
}
