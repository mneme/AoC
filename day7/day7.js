R = require('ramda');

const log = R.bind(console.log, console);

let str = "ioxxoj[asdfgh]zxcvbn";
let parens = /\[.*?\]/g;


function aperture(n){
  return R.compose(
    R.aperture(n),
    R.split('')
  );
}

const isAbbaCode = R.compose(
    R.any((group) => group[0] === group[3] && group[1] === group[2] && group[0] !== group[1]),
    aperture(4)
  );

const hasAbbaCode = R.both(
    R.compose(R.not,R.any(isAbbaCode), R.match(parens)),
    R.compose(R.any(isAbbaCode), R.split(parens))
  );

function countAbba(input){
  return R.compose(
    R.length,
    R.filter(hasAbbaCode),
    R.split('\n')
  )(input);
}


function hasAbaCode(str){
  const potential = R.compose(
    R.filter(isAbaCode),
    R.reduce(R.concat, []),
    R.map(aperture(3))
  )

  const aba = potential(str.split(parens)),
        bab = potential(str.match(parens));


  return R.length(R.intersectionWith(matchingBab,aba,bab));
}

function isAbaCode(arr){
  return (arr[0] === arr[2] && arr[0] !== arr[1]);
}

function matchingBab(aba, bab){
  return [aba[1],aba[0],aba[1]].join('') === bab.join('')
}

const instructions = require('fs').readFileSync('./day7/day7.input', 'utf8');

function countAba(input){
  return R.compose(
    R.length,
    R.filter(hasAbaCode),
    R.split('\n')
  )(input);
}

console.log('day7.1: ', countAbba(instructions));
console.log('day7.2: ',countAba(instructions));




