const R = require('ramda');

let m = new Map();

const instructions = require('fs').readFileSync('./day6/day6.input', 'utf8');

const parse = R.compose(
  R.map(R.split('')),
  R.split('\n')
);