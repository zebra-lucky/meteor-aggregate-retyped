Tinytest.add('method signature', function(test) {
  const coll = new Mongo.Collection(Random.id());
  test.equal(typeof coll.aggRetyped, 'function');
});


Tinytest.add("let's aggregate", function(test) {
  const coll = new Mongo.Collection(Random.id());
  coll.insert({resTime: Decimal(20.00)});
  coll.insert({resTime: Decimal(40.00)});

  const result = coll.aggRetyped([
    {$group: {_id: null, resTime: {$sum: "$resTime"}}}
  ]);

  test.equal(result, [{_id: null, resTime: Decimal(60.00)}]);
});
