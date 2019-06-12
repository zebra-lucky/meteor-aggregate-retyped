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

### Server
```js
import {
  replaceTypes,
  replaceMeteorAtomWithMongo,
  replaceMongoAtomWithMeteor,
  replaceNumberWithDecimal,
  replaceDecimalWithNumber
} from 'meteor/zebralucky:aggregate-retyped';

var meteorTypedDoc = ...
var mongoTypedDoc = ...

var resMongoTyped = replaceTypes(meteorTypedDoc, replaceMeteorAtomWithMongo);
var resMeteorTyped = replaceTypes(mongoTypedDoc, replaceMongoAtomWithMeteor);

var docWithNumbers = ...
var docWithDecimals = ...

var resWithDecimals = replaceTypes(docWithNumbers, replaceNumberWithDecimal);
var resWithNumbers = replaceTypes(docWithDecimals , replaceDecimalWithNumber);
```

### Client
```js
import {
  replaceTypes,
  replaceNumberWithDecimal,
  replaceDecimalWithNumber
} from 'meteor/zebralucky:aggregate-retyped';

var docWithNumbers = ...
var docWithDecimals = ...

var resWithDecimals = replaceTypes(docWithNumbers, replaceNumberWithDecimal);
var resWithNumbers = replaceTypes(docWithDecimals , replaceDecimalWithNumber);

```

## Types retyped (Server code)

### with `replaceMongoAtomWithMeteor`

- `MongoDB.Binary` to `Uint8Array`
- `MongoDB.ObjectID` to `Mongo.ObjectID`
- `MongoDB.Decimal128` to `Decimal`

### with `replaceMeteorAtomWithMongo`

- `Uint8Array` to `MongoDB.Binary`
- `Mongo.ObjectID` to `MongoDB.ObjectID`
- `Decimal` to `MongoDB.Decimal128`
