module.exports = function (app) {
  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);

  pages = [
    {_id: "321", name: "Post 1", websiteId: "456", title: "Ces la Vie"},
    {_id: "432", name: "Post 2", websiteId: "456", title: "Pikachu"},
    {_id: "543", name: "Post 3", websiteId: "456", title: "HellowKitty"}
  ];

  function findAllPagesForWebsite(req, res) {
    console.log('server side find all page for website');
    var websiteId = req.params.websiteId;
    var resultSet = [];
    for (var i = 0; i < pages.length; i++) {
      if (pages[i].websiteId === websiteId) {
        resultSet.push(pages[i]);
      }
    }
    res.json(resultSet);
  }

  function createPage(req, res) {
    console.log('server side create page');
    var websiteId = req.params.websiteId;
    var page = req.body;
    for (var i = 0; i < pages.length; i++) {
      if (pages[i].websiteId === page.websiteId && pages[i].name === page.name) {
        res.status(404).send("This page has already existed.");
        return;
      }
    }
    page._id = Math.random().toString();
    page.websiteId = websiteId;
    pages.push(page);
    res.json(page);
  }

  function deletePage(req, res) {
    console.log('server side delete page');
    var pageId = req.params.pageId;
    for (var i = 0; i < pages.length; i++) {
      if (pages[i]._id === pageId) {
        res.json(pages[i]);
        pages.splice(i, 1);
        return;
      }
    }
    res.status(404).send("Cannot find page");
  }

  function findPageById(req, res) {
    console.log('server side find page by id');
    var pageId = req.params.pageId;
    for (var i = 0; i < pages.length; i++) {
      if (pages[i]._id === pageId) {
        return res.json(pages[i]);
      }
    }
    res.status(404).send("Cannot find page.");
  }

  function updatePage(req, res) {
    console.log('server side update page');
    var pageId = req.params.pageId;
    var updatedPage = req.body;
    for (var i = 0; i < pages.length; i++) {
      if (pages[i]._id === pageId) {
        pages[i].name = updatedPage.name;
        pages[i].title = updatedPage.title;
        res.json(pages[i]);
        return;
      }
    }
    res.status(404).send("Cannot find page");
  }

}
