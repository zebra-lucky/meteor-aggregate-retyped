// use code from mongo package mongo_driver.js
export var replaceTypes = function (doc, atomTransformer) {
  if (atomTransformer == replaceNumberWithDecimal) {
    if (!_.contains(['object', 'number'], typeof doc) || doc === null) {
      return doc;
    }
  } else if (typeof doc !== 'object' || doc === null) {
    return doc;
  }

  var replacedTopLevelAtom = atomTransformer(doc);
  if (replacedTopLevelAtom !== undefined)
    return replacedTopLevelAtom;

  var ret = doc;
  _.each(doc, function (val, key) {
    var valReplaced = replaceTypes(val, atomTransformer);
    if (val !== valReplaced) {
      // Lazy clone. Shallow copy.
      if (ret === doc)
        ret = _.clone(doc);
      ret[key] = valReplaced;
    }
  });
  return ret;
};


export var replaceNumberWithDecimal = function (doc) {
  if (doc instanceof Decimal) {
    return doc;
  } else if (typeof doc === 'number') {
    return Decimal(doc);
  }
  return undefined;
};


export var replaceDecimalWithNumber = function (doc) {
  if (doc instanceof Decimal) {
    return Number(doc.toString());
  }
  return undefined;
};
