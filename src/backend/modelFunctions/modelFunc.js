const mongoose = require('mongoose')

const createDocument = function(document, model, callback){
  model.create(document, callback);
};

const findDocs = function(filter, select, model, callback){
  model.find(filter, select).exec(callback);
};

const populateDoc = function(filter, select,  populateQuery, model, callback){
  model.find(filter, select).populate(populateQuery).exec(callback)
}

const populateOneDoc = function(filter, select,  populateQuery, model, callback){
  model.findOne(filter, select).populate(populateQuery).exec(callback)
}

const findOneDoc = function( filter, select, model, callback){
  model.findOne(filter, select).exec(callback)
}

const updateDoc = function( id, changes, select,  model, callback){
  model.findByIdAndUpdate(id, { $set : changes}, {select:select}, callback)
};

const updatePushDoc = function( id, changes, select,  model, callback){
  model.findByIdAndUpdate(id, { $push : changes}, {select:select}, callback)
};

const deleteDoc = function(id, model, callback){
  model.findByIdAndRemove(id, callback);
};

module.exports = {
  createDoc : createDocument,
  populateDoc : populateDoc,
  populateOneDoc : populateOneDoc,
  findDocs : findDocs,
  findOneDoc : findOneDoc,
  updateDoc : updateDoc,
  updatePushDoc : updatePushDoc,
  deleteDoc : deleteDoc
}
