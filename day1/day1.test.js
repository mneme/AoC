'use strict';

var chai = require('chai'),
    should = chai.should(),
    day1 = require('./index.js');

describe('followDirections', function () {
  it('should pass', function(){
    day1.followDirections([0, 0], [0, 1], "R5", "L5", "R5", "R3")should.equal([10, 2]);
  });
});