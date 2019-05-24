var MongoDB = MongoInternals.NpmModules.mongodb.module;


// use code from mongo package mongo_driver.js
var replaceTypes = function (document, atomTransformer) {
  if (typeof document !== 'object' || document === null)
    return document;

  var replacedTopLevelAtom = atomTransformer(document);
  if (replacedTopLevelAtom !== undefined)
    return replacedTopLevelAtom;

  var ret = document;
  _.each(document, function (val, key) {
    var valReplaced = replaceTypes(val, atomTransformer);
    if (val !== valReplaced) {
      // Lazy clone. Shallow copy.
      if (ret === document)
        ret = _.clone(document);
      ret[key] = valReplaced;
    }
  });
  return ret;
};


var replaceMongoAtomWithMeteor = function (document) {
  if (document instanceof MongoDB.Binary) {
    var buffer = document.value(true);
    return new Uint8Array(buffer);
  }
  if (document instanceof MongoDB.ObjectID) {
    return new Mongo.ObjectID(document.toHexString());
  }
  if (document instanceof MongoDB.Decimal128) {
    return Decimal(document.toString());
  }
  return undefined;
};


Mongo.Collection.prototype.aggRetyped = function(pipelines, options) {
  var agg = Mongo.Collection.prototype.aggregate;
  var res = agg.bind(this)(pipelines, options);
  return _.map(res, function(doc){
    return replaceTypes(doc, replaceMongoAtomWithMeteor);
  });
};
