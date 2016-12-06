//Screw readabiliy in favour of just writing as much ramda on a single line as possible

const moves = new Map([["U", [0, -1]],["D", [0, 1]],["L", [-1, 0]],["R", [1, 0]]]);

function getKey(keypad, position){
  return keypad[position[1]*(keypadMax(keypad)+1)+position[0]];
}

function keypadMax(keypad){
  return Math.sqrt(keypad.length)-1;
}

function applyInstruction(keypad, position, instruction){
  let newPosition = R.zipWith((value, delta) =>  R.clamp(0, keypadMax(keypad), value+delta), position, instruction);
  return getKey(keypad, newPosition) ? newPosition : position;
}

function builder(start, keypad) {
  const calculateRow = (positions, rowInstrucions) => R.concat(positions,[R.reduce(R.curry(applyInstruction)(keypad), R.last(positions), R.map((ins)=>moves.get(ins), rowInstrucions))]);

  return R.compose(
  R.join(""),
  R.tail,
  R.map(R.curry(getKey)(keypad)),
    R.reduce(calculateRow, [start]),
    R.compose(R.map(R.compose(R.split(''), R.trim)), R.split("\n"))
  )
}

exports.follow = function(){
  const keypad = [1,2,3,
  4,5,6,
  7,8,9];

  return builder([1,1], keypad)
}();

exports.follow2 = function() {
  const keypad =[
      ,   ,'1',   ,   ,
      ,'2','3','4',   ,
   '5','6','7','8','9',
      ,'A','B','C',   ,
      ,   ,'D',   ,   ,
  ];
  return builder([0,2], keypad)
}();
