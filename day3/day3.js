const R = require('ramda');

const parse = R.compose(
    R.map(
      R.compose(
        R.map(parseInt),
        R.split(/ +/),
        R.trim
      )
    ),
    R.split('\n')
  );

const testTriangle =
  R.compose(
    sorted => ((sorted[0] + sorted[1]) > sorted[2]),
    R.sort((a, b) => a-b)
  );

const countValidTriangles = 
  R.compose(
    R.length, 
    R.filter(R.identity),
    R.map(testTriangle)
  );

function group(n, list){
  let acc = [];
  for (var i = 0; i + n  <= list.length; i = i+n) {
    acc.push(list.slice(i, i+n));
  }
  return acc;
}

const transpose = 
  R.compose(
    R.reduce(R.concat, []),
    R.map(R.transpose),
    R.curry(group)(3)
  );

exports.apply = 
  R.compose(
    countValidTriangles,
    parse
  );

exports.apply2 = 
  R.compose(
    countValidTriangles,
    transpose,
    parse
  );