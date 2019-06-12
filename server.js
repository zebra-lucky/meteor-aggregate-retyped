import { EJSON } from 'meteor/ejson';
import { Decimal } from 'meteor/mongo-decimal';
import {
  replaceTypes,
  replaceNumberWithDecimal,
  replaceDecimalWithNumber
} from './common.js';


var MongoDB = MongoInternals.NpmModules.mongodb.module;


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


var replaceMeteorAtomWithMongo = function (document) {
  if (EJSON.isBinary(document)) {
    return new MongoDB.Binary(Buffer.from(document));
  }
  if (document instanceof Mongo.ObjectID) {
    return new MongoDB.ObjectID(document.toHexString());
  }
  if (document instanceof Decimal) {
    return MongoDB.Decimal128.fromString(document.toString());
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


export {
  replaceTypes,
  replaceMongoAtomWithMeteor,
  replaceMeteorAtomWithMongo,
  replaceNumberWithDecimal,
  replaceDecimalWithNumber
};
