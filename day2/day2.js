/*
  Poorly ramda all the things. One-liners ftw, go to hell readability!
*/
const R = require('ramda');
const moves = new Map([["U", [0, -1]],["D", [0, 1]],["L", [-1, 0]],["R", [1, 0]]]);

const formatOutput = R.curry((keypad) => R.compose(R.join(''), R.map(getKey(keypad)))),
      getKey = R.curry((keypad, position) => keypad[position[1]*Math.sqrt(keypad.length)+position[0]]),
      move = R.curry(function(keypad, pos, next){
        let m = moves.get(next),
            nextPos = R.zipWith((value, delta) =>  value+delta)(pos, m);
        return (getKey(keypad, nextPos) ? nextPos : pos);
      }),
      collect = R.curry((reducer, value, arr) => arr.map(next => value = reducer(value, next))),
      row = R.curry((keypad, num, line) => line.split('').reduce(move(keypad),num));

function builder(start, keypad) {
  return R.compose(
    formatOutput(keypad),
    collect(row(keypad), start),
    R.split('\n')
  )
}

exports.apply = builder([1,1], [
    1,2,3,
    4,5,6,
    7,8,9
  ]);

exports.apply2 =  builder([0,2], [
      ,   ,'1',   ,   ,
      ,'2','3','4',   ,
   '5','6','7','8','9',
      ,'A','B','C',   ,
      ,   ,'D',   ,   ,
  ]);