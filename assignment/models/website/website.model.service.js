var mongoose = require("mongoose");
var WebsiteSchema = require("./website.schema.server");
var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);


WebsiteModel.createWebsite = createWebsite;
WebsiteModel.findWebsitesForUser = findWebSitesForUser;
WebsiteModel.createWebsiteForUser =createWebsiteForUser;
WebsiteModel.updateWebsite = updateWebsite;
WebsiteModel.findWebsiteById = findWebsiteById;
WebsiteModel.deleteWebsite = deleteWebsite;

module.exports = WebsiteModel;


function createWebsite(website){
  return WebsiteModel.create(website)
    .then(function(responseWebsite){
      WebsiteModel.findUserById(website.developerId)
        .then(function(user){
          user.websites.push(responseWebsite);
          return user.save();
        })
    });
}



function findWebSitesForUser(userId){
  return WebsiteModel.find({"developId": userId})
  //.populate('developerId')
    .populate('developId', 'username')
    .exec();
}

function createWebsiteForUser(userId, website){
  // console.log("this is from userId " + userId);
  return WebsiteModel.create(website)
    .then(function(responseWebsite){
      // console.log("this is from website " + responseWebsite.developId);
      UserModel.findUserById(website.developId)
        .then(function(user){
          user.websites.push(responseWebsite);
          return user.save();
        });
      return responseWebsite;
    });
}

function findWebsiteById(websiteId) {
  return WebsiteModel.findWebsiteById(websiteId);
}

function updateWebsite(websiteId, website) {
  return WebsiteModel.update({_id: websiteId},website );
}

function deleteWebsite(websiteId) {
  website = WebsiteModel.findWebisteById(websiteId).then(function(website) {
    UserModel.findUserById(website.developId).then(function(user){
      user.websites.pull({_id: websiteId});
      user.save();
    })
  });
  return WebsiteModel.remove({_id: websiteId});
}
