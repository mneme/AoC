'use strict';

var chai = require('chai'),
    should = chai.should(),
    day1 = require('./day1.js');

describe('day1.follow', function () {
  it('should get right destination', function(){
    day1.follow([0, 0], [0, 1], "R5", "L5", "R5", "R3").should.deep.equal([10, 2]);
    day1.follow([0, 0], [0, 1], "R2", "L3").should.deep.equal([2, 3]);
    day1.follow([0, 0], [0, 1], "R2", "R2", "R2").should.deep.equal([0, -2]);

    day1.follow([0, 0], [0, 1], "R5", "R5", "R5", "R5").should.deep.equal([0, 0]);

  });
  it('should handle and origin not in origo', function(){
  	day1.follow([10, 10], [0, 1], "R5").should.deep.equal([15, 10]);

  })
  it('should handle different start directions', function(){
  	 day1.follow([0, 0], [0, -1], "R5").should.deep.equal([-5, 0]);
  });
});

describe('day1.distance', function(){
	it('should give correct distance', function(){
		day1.distance([0,0], [12, 10]).should.equal(22);
	})
	it('should handle different origin', function(){
	 	day1.distance([-10,-10], [0, 0], "R5").should.equal(20);
	});

});