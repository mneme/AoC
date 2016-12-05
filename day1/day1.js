R = require('ramda');

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

function follow(position, facing, head, ...rest){
  if(!head){
    return position;
  }
  let [dir, n] =  [head.charAt(0),head.slice(1)];
  facing = rotate(facing, dir);
  return follow(move(position, facing, n), facing, ...rest);
}

function distance(origin, position){
  return Math.abs(position[0] - origin[0]) + Math.abs(position[1] - origin[1]);
}

module.exports.follow = follow;
module.exports.distance = distance;