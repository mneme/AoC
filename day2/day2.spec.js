'use strict';

var chai = require('chai'),
    should = chai.should(),
    day2 = require('./day2.js');

describe('day2', function(){

  describe('apply', function () {
    it('should get right end position', function(){
      day2.apply('ULL\nRRDDD\nLURDL\nUUUUD').should.equal('1985');
    });
  });
  describe('apply2', function () {
    it('should get right end position', function(){
      day2.apply2('ULL\nRRDDD\nLURDL\nUUUUD').should.equal('5DB3');
    });
  });
});

