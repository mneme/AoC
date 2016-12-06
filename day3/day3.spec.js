'use strict';

var chai = require('chai'),
    should = chai.should(),
    day3 = require('./day3.js');

describe('day3', function(){
  describe('apply', function () {
    it('should get the right amount of valid triangles', function(){
      day3.apply("5 10 25").should.equal(0);
      day3.apply("20 6 25\n5 10 14\n5 10 25").should.equal(2);
    });
  });
  describe('apply2', function () {
    it('should get the right amount of valid triangles', function(){
      day3.apply2("20  5  5\n6  10  10\n25 14 25").should.equal(2);
    });
  });
});