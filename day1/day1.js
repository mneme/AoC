R = require('ramda');

function mod(n, m) {
  return ((n % m) + m) % m;
}

function rotate(facing, dir){
  let [x,y] = facing,
      rot = (dir === "R" ? 1 : -1) * Math.PI/2;  
  return [Math.round(x*Math.cos(rot) - y*Math.sin(rot)), Math.round(x*Math.sin(rot) + y*Math.cos(rot))];
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