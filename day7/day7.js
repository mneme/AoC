/*
* Play with generators but all I want is lazyseq from clojure.
*/
R = require('ramda');

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

const potentialAbaCode = R.compose(
  R.filter(isAbaCode),
  R.reduce(R.concat, []),
  R.map(aperture(3))
)

function hasAbaCode(str){
  return R.compose(
    R.length,
    R.useWith(
      R.intersectionWith((a, b) => a[1]+a[0]+a[1] === b.join('')),
      [str => potentialAbaCode(str.split(parens)),
      str => potentialAbaCode(str.match(parens))]
    )
  )(str, str);
}

function isAbaCode(arr){
  return (arr[0] === arr[2] && arr[0] !== arr[1]);
}

function count(code, input){
  return R.compose(
    R.length,
    R.filter(code),
    R.split('\n')
  )(input);
}

const instructions = require('fs').readFileSync('./day7/day7.input', 'utf8');

console.log('day7.1: ', count(hasAbbaCode, instructions));
console.log('day7.2: ',count(hasAbaCode, instructions));