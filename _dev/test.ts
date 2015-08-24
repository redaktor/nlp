
import Promise = require('../src/dojo/Promise');

function test(v:any) {
  return Promise.resolve(v);
}

test('hello').then(function(x){ console.log(x); });
