Package.describe({
  summary: 'Mongo.Collection aggRetyped aggregate method',
  version: '0.0.4',
  git: 'https://github.com/zebra-lucky/meteor-aggregate-retyped',
  name: 'zebralucky:aggregate-retyped'
});

Package.onUse(function(api) {
  configurePackage(api);
});

Package.onTest(function(api) {
  configurePackage(api);
  api.use([
    'mongo-decimal@0.1.0',
    'tinytest',
    'accounts-password',
    'random'
  ], ['server']);

  // common before
  api.addFiles(['test.js'], ['server']);
});

function configurePackage(api) {
  api.versionsFrom('METEOR@1.7', 'METEOR@1.8');
  api.use([
    'sakulstra:aggregate@1.4.3',
    'mongo',
    'mongo-decimal@0.1.0',
    'underscore',
    'ecmascript'
  ], ['server']);
  api.use([
    'mongo-decimal@0.1.0',
    'underscore',
    'ecmascript'
  ], ['client']);

  // common before
  api.mainModule('server.js', 'server');
  api.mainModule('client.js', 'client');
}
