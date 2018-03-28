var mongoose = require('mongoose');
var PageSchema = require("./page.schema.server");
var PageModule = mongoose.model("PageModule", PageSchema);//use model to communicate with db, service will not do query anymore

module.exports = PageModule;

function createPage(websiteId, page) {
  return PageModel.create(page)
    .then(function(newPage){
      PageModule.findPageByWebsiteId(websiteId)
        .then(function(website){
          website.pages.push(newPage);
          return website.save();
        });
      return newPage;
    });
}

function updatePage(pageId, page){
  return PageModule.update({pageId: pageId}, page);
}

function deletePage(pageId){

  var deletepage = PageModule.findPageById(pageId)
  .then(function (page) {
    WebsiteModule.findWebsiteById(websiteId)
      .then(function (website) {
          website.pages.remove(deletepage);
          return website.save();
      });
    return PageModule.pages;
  });
}

function findAllPagesForWebsite(websiteId) {
  return PageModel.find({'websiteId' : websiteId})
    .populate('websiteId')
    .exec();
}

function findPageById(pageId) {
  return PageModel.findById(pageId);
}


