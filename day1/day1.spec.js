'use strict';

var chai = require('chai'),
    should = chai.should(),
    day1 = require('./day1.js');

describe('day1', function(){

  describe('apply', function () {
    it('should get right end position', function(){
      day1.apply("R5", "L5", "R5", "R3").should.deep.equal([10, 2]);
      day1.apply("R2", "L3").should.deep.equal([2, 3]);
      day1.apply("R2", "R2", "R2").should.deep.equal([0, -2]);
    });
  });

  describe('distance', function(){
    it('should give correct distance', function(){
      day1.distance([12, 10]);
    });
  });
})