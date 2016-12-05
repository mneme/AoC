'use strict';

var chai = require('chai'),
    should = chai.should(),
    _ = require('lodash');

describe('test', function () {
  it('should pass', function(){
    var foo = true;
    foo.should.be.true;
  });
  it('should fail', function(){
    var foo = true;
    foo.should.be.false();
  });
  it('should be pending');
});