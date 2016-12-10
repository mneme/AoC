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

function hasAbaCode(str){
  const potential = R.compose(
    R.filter(isAbaCode),
    R.reduce(R.concat, []),
    R.map(aperture(3))
  )

  const aba = potential(str.split(parens)),
        bab = potential(str.match(parens));

  return R.length(R.intersectionWith((a, b) =>{
      return [a[1],a[0],a[1]].join('') === b.join('')
    }, aba, bab));
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


