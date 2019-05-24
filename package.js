Package.describe({
  summary: 'Mongo.Collection aggRetyped aggregate method',
  version: '0.0.1',
  git: 'https://github.com/zebra-lucky/meteor-aggregate-retyped',
  name: 'zebralucky:aggregate-retyped'
});

Package.onUse(function(api) {
  configurePackage(api);
});

Package.onTest(function(api) {
  configurePackage(api);
  api.use(['mongo-decimal', 'tinytest', 'accounts-password', 'random'],
          ['server']);

  // common before
  api.addFiles(['test.js'], ['server']);
});

function configurePackage(api) {
  api.versionsFrom('METEOR@1');
  api.use(['sakulstra:aggregate', 'mongo', 'mongo-decimal', 'underscore'],
          ['server']);

  // common before
  api.addFiles(['index.js'], ['server']);
}