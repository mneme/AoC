const R = require('ramda');

const countValidTriangles = R.compose(R.length, R.filter(v=>v), R.map(testTriangle)),
      parse = R.compose(R.map(R.compose(R.map(parseInt),R.split(/ +/),R.trim)),R.split('\n'));

function testTriangle(triangle){
  var sorted = R.sort((a, b) => a-b,triangle);
  return ((sorted[0] + sorted[1]) > sorted[2]);
}

function transpose(acc, list){
  if(list.length > 2){
    const transposed = R.transpose(R.take(3, list));
    return transpose(R.concat(acc, transposed),R.drop(3, list));
  }
  return acc;
}

exports.apply = function(input){
  const data = parse(input)
  return countValidTriangles(data);
}

exports.apply2 = function(input){
  const transposed = transpose([], parse(input))
  return countValidTriangles(transposed);
}