// var mongoose = require('mongoose');
// var PageSchema = require("./page.schema.server");
// var WebsiteSchema = require("../website/website.schema.server");
// var PageModel = mongoose.model("PageModule", PageSchema);//use model to communicate with db, service will not do query anymore
// var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);
// PageModel.updatePage = updatePage;
// PageModel.createPage = createPage;
// PageModel.deletePage = deletePage;
// PageModel.findAllPagesForWebsite = findAllPagesForWebsite;
// PageModel.findPageById = findPageById;
//
// module.exports = PageModel;
//
// function createPage(websiteId, page) {
//   return PageModel.create(page)
//     .then(function(newPage){
//       PageModel.findPageByWebsiteId(websiteId)
//         .then(function(website){
//           website.pages.push(newPage);
//           return website.save();
//         });
//       return newPage;
//     });
// }
//
// function updatePage(pageId, page){
//   return PageModel.update({pageId: pageId}, page);
// }
//
// function deletePage(pageId){
//
//   var deletepage = PageModel.findPageById(pageId)
//   .then(function (page) {
//     WebsiteModel.findWebsiteById(websiteId)
//       .then(function (website) {
//           website.pages.remove(deletepage);
//           return website.save();
//       });
//     return PageModel.pages;
//   });
// }
//
// function findAllPagesForWebsite(websiteId) {
//   return PageModel.find({'websiteId' : websiteId})
//     .populate('websiteId')
//     .exec();
// }
//
// function findPageById(pageId) {
//   return PageModel.findById(pageId);
// }
//
//

module.exports = function () {
  var model = {};
  var mongoose = require("mongoose");
  var PageSchema = require("./page.schema.server");
  var PageModel = mongoose.model("PageModel", PageSchema);


  var api = {
    createPage: createPage,
    findAllPagesForWebsite: findAllPagesForWebsite,
    findPageById: findPageById,
    updatePage: updatePage,
    deletePage: deletePage,
    setModel: setModel

  };
  return api;

  function setModel(_model) {
    model = _model;
  }

  function deletePage(pageId) {
    return PageModel.remove({_id: pageId});
  }

  function updatePage(pageId, page) {
    return PageModel
      .update(
        {
          _id: pageId
        },
        {
          _website: page._website,
          name: page.name,
          title: page.title,
          description: page.description,
          widgets: page.widgets,
          dateCreated: page.dateCreated
        }
      );
  }

  function findPageById(pageId) {
    return PageModel.findById(pageId);
  }

  function findAllPagesForWebsite(websiteId) {
    return model.WebsiteModel
      .findWebsiteById(websiteId)
      .populate("pages", "name")
      .exec();
  }


  function createPage(websiteId, page) {
    return PageModel
      .create(page)
      .then(function (pageObj) {
        return model.WebsiteModel
          .findWebsiteById(websiteId)
          .then(function (websiteObj) {
            websiteObj.pages.push(pageObj);
            pageObj._website = websiteObj._id;
            pageObj.save();
            return websiteObj.save();
          })
      })
  }

};
