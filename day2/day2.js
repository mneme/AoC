let keypad = [[1,2,3], [4,5,6],[7,8,9]],
    moves = new Map([["U", [0, -1]],["D", [0, 1]],["L", [-1, 0]],["R", [1, 0]]]);

function calculateRow(positions, rowInstrucions){
  let destination = R.reduce(apply, R.last(positions) || [1,1], R.map((ins)=>moves.get(ins), rowInstrucions));   
  return positions.concat([destination]);
}

let calculate =  R.reduce(calculateRow, []);
let apply = R.zipWith((value, delta) =>  R.clamp(0, 2, value+delta));
let getKeys = R.map(position => keypad[position[1]][position[0]]);
let parseInput = R.compose(R.map(R.compose(R.split(''), R.trim)), R.split("\n"));

exports.follow = R.compose(
    R.join(''),
    getKeys,
    calculate,
    parseInput
  );