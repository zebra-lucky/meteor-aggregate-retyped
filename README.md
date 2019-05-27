# Retyped version of aggregate

A simple package to retype aggregate calls (based on `sakulstra:aggregate`).

## Usage

Add to your app with
```sh
meteor add zebralucky:aggregate-retyped
```

Then simply use `.aggRetyped` function like below.

```js
var metrics = new Mongo.Collection('metrics');
var pipeline = [
  {$group: {_id: null, resTime: {$sum: "$resTime"}}}
];
var result = metrics.aggRetyped(pipeline);
```

See `sakulstra:aggregate` package for more info.

## Manual retyping

```js
import {
  replaceTypes,
  replaceMeteorAtomWithMongo,
  replaceMongoAtomWithMeteor
} from 'meteor/zebralucky:aggregate-retyped';

var meteorTypedDoc = ...
var mongoTypedDoc = ...

var mongoTyped = replaceTypes(meteorTypedDoc, replaceMeteorAtomWithMongo);
var meteorTyped = replaceTypes(mongoTypedDoc, replaceMongoAtomWithMeteor);
```

## Types retyped

### MongoDB to Meteor

- `MongoDB.Binary` to `Uint8Array`
- `MongoDB.ObjectID` to `Mongo.ObjectID`
- `MongoDB.Decimal128` to `Decimal`

### Meteor to MongoDB

- `Uint8Array` to `MongoDB.Binary`
- `Mongo.ObjectID` to `MongoDB.ObjectID`
- `Decimal` to `MongoDB.Decimal128`
