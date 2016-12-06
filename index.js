day1 = require('./day1/day1.js');
day2 = require('./day2/day2.js');


function d1(){
	const instructions  = require('fs').readFileSync('day1/day1.input', 'utf8');
	console.log('day1', day1.distance(day1.follow(...instructions)));
	console.log('day1', day1.distance(day1.twice(...instructions)));
}


function d2(){
  const instructions = require('fs').readFileSync('day1/day1.input', 'utf8');
  console.log('day2', day2.follow(instructions));
}

//d1();
d2();




