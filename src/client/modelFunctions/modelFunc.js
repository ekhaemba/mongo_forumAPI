var mongoose = require('mongoose')

var createDocument = function(document, model, callback){
  model.create(document, function(err, document){
    if(!err){
      callback(document);
    }
    else{
      console.log("Error",err)
      callback({ error_code: err.code})
    }
  });
};

var findDocs = function(filter, select, model, callback){
  model.find(filter, select).exec(function(err, documents){
    if (!err){
      callback(documents);
    }
  });
};

var populateDoc = function(filter, select,  populateQuery, model, callback){
  model.find(filter, select).populate(populateQuery).exec(function(err, documents){
    if (!err){
      callback(documents);
    }
    else{
      console.log("Error",err)
      callback({ error_code: err.code})
    }
  })
}

var findOneDoc = function( filter, model, callback){
  model.findOne(filter).exec(function(err, docs){
    if(err){
      console.log(err)
    }else{
      callback(docs)
    }
  })
}

var updateDoc = function(changes, id, model, callback){
  model.update({_id: id}, changes, function(err, document){
    if (!err){
      callback(document);
    }
    else{
      callback({error_code:err.code})
    }
  });
};

var deleteDoc = function(id, model, callback){
  model.findByIdAndRemove(id, function(err, document){
    if (!err){
      callback(document);
    }
    else{
      callback({error_code:err.code})
    }
  });
};

module.exports = {
  createDoc : createDocument,
  populateDoc : populateDoc,
  findDocs : findDocs,
  findOneDoc : findOneDoc,
  updateDoc : updateDoc,
  deleteDoc : deleteDoc
}
