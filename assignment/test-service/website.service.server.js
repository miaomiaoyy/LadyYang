module.exports = function (app) {
  app.post('/api/user/:userId/website', createWebsite);
  app.get('/api/user/:userId/website', findAllWebsitesByUser);
  app.get('/api/website/:websiteId', findWebsiteById);
  app.put('/api/website/:websiteId', updateWebsite);
  app.delete('/api/website/:websiteId', deleteWebsite);

  const websites = [
    { '_id': '123', 'name': 'Facebook',    'developerId': '456', 'description': 'Lorem' },
    { '_id': '234', 'name': 'Tweeter',     'developerId': '456', 'description': 'Lorem' },
    { '_id': '456', 'name': 'Gizmodo',     'developerId': '456', 'description': 'Lorem' },
    { '_id': '890', 'name': 'Go',          'developerId': '123', 'description': 'Lorem' },
    { '_id': '567', 'name': 'Tic Tac Toe', 'developerId': '123', 'description': 'Lorem' },
    { '_id': '678', 'name': 'Checkers',    'developerId': '123', 'description': 'Lorem' },
    { '_id': '789', 'name': 'Chess',       'developerId': '234', 'description': 'Lorem' }
  ];

  function createWebsite(req, res) {
    const userId = req.params['userId'];
    const website = req.body;
    const new_website = {
      _id: (new Date()).getTime() + '',
      name: website.name,
      developerId: userId,
      description: website.description
    };
    websites.push(new_website);
    res.json(new_website);
  }

  function findAllWebsitesByUser(req, res) {
    const userId = req.params['userId'];
    const websitesByUser = websites.filter(function (website) {
      return website.developerId === userId;
    });
    res.json(websitesByUser);
  }

  function findWebsiteById(req, res) {
    const websiteId = req.params['websiteId'];
    const website = websites.find(function (website) {
      return website._id === websiteId;
    });
    res.json(website);
  }

  function updateWebsite(req, res) {
    let websiteId = req.params['websiteId'];
    let website = req.body;
    for (const i in websites) {
      if (websites[i]._id === websiteId) {
        websites[i].name = website.name;
        websites[i].developerId = website.developerId;
        websites[i].description = website.description;
        res.json(websites[i]);
        return;
      }
    }
  }

  function deleteWebsite(req, res) {
    let websiteId = req.params['websiteId'];
    websites.splice(websites.findIndex(function(website) {
      return website._id === websiteId;
    }), 1);
    res.json({});
  }
};
