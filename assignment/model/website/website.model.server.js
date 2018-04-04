var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var websiteModel = mongoose.model('websiteModel', websiteSchema);
var userModel = require("../user/user.model.server");

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPage = addPage;
websiteModel.removePageFromWebsite = removePageFromWebsite;

module.exports = websiteModel;

function createWebsiteForUser(userId, website){
  website._user = userId;
  return websiteModel.create(website)
    .then(function (website) {
      return userModel.addWebsite(userId, website._id);
    });
}

function findAllWebsitesForUser(userId){
  return websiteModel.find({"_user": userId})
       .populate('_user')
  //   .populate('_user', 'username')
    .exec();
}

function findWebsiteById(websiteId) {
  return websiteModel.findOne({_id: websiteId});
}

function updateWebsite(websiteId, website) {
  return websiteModel.update(
    {
      _id: websiteId
    },
    {
      name: website.name,
      description: website.description
    }
  );
}

function deleteWebsite(websiteId) {
  return websiteModel.findOne({_id: websiteId})
    .then(function(website) {
      var userId = website._user;
      websiteModel.remove({_id: websiteId})
        .then(function() {
          return userModel.deleteWebsite(userId, websiteId);
        });
    });
}

function addPage(websiteId, pageId) {
  return websiteModel.findById(websiteId)
    .then(function (website) {
      website.pages.push(pageId);
      return website.save();
    });
}

function removePageFromWebsite(websiteId, pageId) {
  return websiteModel.findById(websiteId)
    .then(function (website) {
      website.pages.pull(pageId);
      return website.save();
    });
}
