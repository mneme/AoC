R = require('ramda');

let directions = "R2, L1, R2, R1, R1, L3, R3, L5, L5, L2, L1, R4, R1, R3, L5, L5, R3, L4, L4, R5, R4, R3, L1, L2, R5, R4, L2, R1, R4, R4, L2, L1, L1, R190, R3, L4, R52, R5, R3, L5, R3, R2, R1, L5, L5, L4, R2, L3, R3, L1, L3, R5, L3, L4, R3, R77, R3, L2, R189, R4, R2, L2, R2, L1, R5, R4, R4, R2, L2, L2, L5, L1, R1, R2, L3, L4, L5, R1, L1, L2, L2, R2, L3, R3, L4, L1, L5, L4, L4, R3, R5, L2, R4, R5, R3, L2, L2, L4, L2, R2, L5, L4, R3, R1, L2, R2, R4, L1, L4, L4, L2, R2, L4, L1, L1, R4, L1, L3, L2, L2, L5, R5, R2, R5, L1, L5, R2, R4, R4, L2, R5, L5, R5, R5, L4, R2, R1, R1, R3, L3, L3, L4, L3, L2, L2, L2, R2, L1, L3, R2, R5, R5, L4, R3, L3, L4, R2, L5, R5".split(', ');
console.log(directions);
let orientation = [[0,1], [1, 0], [0, -1], [-1, 0]];

function mod(n, m) {
  return ((n % m) + m) % m;
}

function rotate(facing, dir){
  let index = R.indexOf(facing, orientation),
      newIndex = mod(index + (dir === "L" ? -1 : 1), 4);
  return orientation[newIndex];
}

function move(position, facing, n){
  return R.zipWith(function(p, f){
    return p + f * n;
  }, position, facing);
}

function follow(position, facing, direction){
  let [dir, n] = direction.split(''); 
  return move(position, rotate(facing, dir), n);
}

function followDirections(position, facing, head, ...rest){
  if(!head){
    return position;
  }
  let [dir, n] = head.split(''); 
  facing = rotate(facing, dir);
  return followDirections(move(position, facing, n), facing, ...rest);
}

module.exports.followDirections = followDirections;

console.log(followDirections([0, 0], [0, 1], "R5", "L5", "R5", "R3"));