
import Promise = require('../src/dojo2/src/Promise');

function test(v:any) {
  return Promise.resolve(v);
}

test('hello').then(function(x){ console.log(x); });
