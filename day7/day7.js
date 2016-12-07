R = require('ramda');

const log = R.bind(console.log, console);

let str = "ioxxoj[asdfgh]zxcvbn";
let parens = /\[.*?\]/g;


const isAbbaCode = R.compose(
    R.any((group) => group[0] === group[3] && group[1] === group[2] && group[0] !== group[1]), 
    R.aperture(4), 
    R.split('')
);

function hasAbbaCode(str){
  return R.not(R.any(isAbbaCode, str.match(parens))) && R.any(isAbbaCode, str.split(parens));
}

const instructions = require('fs').readFileSync('./day7/day7.input', 'utf8');

console.log(R.compose(
  R.length,
  R.filter(hasAbbaCode),
  R.split('\n')
)(instructions));


function bab(aba){
  return [aba.charAt[1], aba.charAt[0], charAt[1]]
}

function isAbaCode(str){
  return str[0] === str[2];
}
