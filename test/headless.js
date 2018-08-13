global.window = global;
global.assert = require('chai').assert;
global.fixtures = {
  places: require('../data/places.json'),
};
require('../src/data');
require('./data.spec.js');