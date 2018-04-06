var mongoose = require("mongoose");
var pageSchema = require('./page.schema.server');
var pageModel =  mongoose.model('pageModel', pageSchema);
var websiteModel = require('../website/website.model.server');

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;
pageModel.deleteWidget = deleteWidget;
pageModel.reorderWidget = reorderWidget;

module.exports = pageModel;

function createPage(websiteId, page) {
  page._website = websiteId;
  return pageModel.create(page)
    .then(function (page) {
      websiteModel.addPage(websiteId, page._id);
    })
}

function findAllPagesForWebsite(websiteId) {
  return pageModel.find({_website: websiteId})
    .populate('_website')
    .exec();
}

function findPageById(pageId) {
  return pageModel.findOne({_id: pageId});
}

function updatePage(pageId, page) {
  return pageModel.update(
    {
      _id: pageId
    },
    {
      name: page.name,
      title: page.title,
      description: page.description
    }
  );
}

function deletePage(pageId) {
  return pageModel.findOne({_id: pageId})
    .then(function (page) {
      var websiteId = page._website;
      pageModel.remove({_id: pageId})
        .then(function() {
          return websiteModel.removePageFromWebsite(websiteId, pageId);
        });
    });
}

function addWidget(pageId, widgetId) {
  return pageModel.findById(pageId)
    .then(function (page) {
      page.widgets.push(widgetId);
      return page.save();
    });
}

function deleteWidget(pageId, widgetId) {
  return pageModel.findById(pageId)
    .then(function (page) {
      page.widgets.pull(widgetId);
      return page.save();
    });
}

function reorderWidget(pageId, startWidgetId, endIndex) {
  return pageModel.findById({_id: pageId})
    .then(function (page) {
      page.widgets.pull(startWidgetId);
      page.widgets.splice(endIndex, 0, startWidgetId);
      return page.save();
    });
}
