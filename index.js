day1 = require('./day1/day1.js');
day2 = require('./day2/day2.js');
day3 = require('./day3/day3.js');

function d1(){
	const instructions  = require('fs').readFileSync('day1/day1.input', 'utf8').split(", ");
	console.log('day1', day1.distance(day1.apply(...instructions)));
	console.log('day1', day1.distance(day1.twice(...instructions)));
}

function d2(){
  const instructions = require('fs').readFileSync('day2/day2.input', 'utf8');
  console.log('day2.1', day2.apply(instructions));
  console.log('day2.2', day2.apply2(instructions));
}

function d3(){
  const instructions = require('fs').readFileSync('day3/day3.input', 'utf8');
  console.log('day3.1', day3.apply(instructions));
  console.log('day3.2', day3.apply2(instructions));
}


d1();
d2();
d3();
