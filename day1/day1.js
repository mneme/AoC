/*
  Seems like tail recurssion isn't optimized, will cause stack overflow.
  Api requiring ...spread is just annoying.
  Twice uses fugly let x of y, but needs too much rebuild for me to bother.
*/

const R = require('ramda'),
      immutable = require('immutable');

function rotate(facing, dir){
  let [x,y] = facing,
      rot = (dir === "L" ? 1 : -1) * Math.PI/2;  
  return [Math.round(x*Math.cos(rot) - y*Math.sin(rot)), 
          Math.round(x*Math.sin(rot) + y*Math.cos(rot))];
}

function move(position, facing, n){
  return R.zipWith(function(p, f){
    return p + f * n;
  }, position, facing);
}

function parseInstruction(instruction){
  return [instruction.charAt(0),instruction.slice(1)];
}

function follow(position, facing, head, ...rest){
  if(!head){
    return position;
  }
  let [dir, n] = parseInstruction(head);
  facing = rotate(facing, dir);
  return follow(move(position, facing, n), facing, ...rest);
}

function distance(origin, position){
  return Math.abs(position[0] - origin[0]) + Math.abs(position[1] - origin[1]);
}

function twice(visited, position, facing, head, ...rest){
  if(!head){
    return null;
  }
  let [dir, n] = parseInstruction(head);
      steps = R.repeat(1, n);   
  
  facing = rotate(facing, dir);
  
  for(let step of steps){
    position = move(position, facing, step);

    if(R.contains(position, visited.toArray())){
      return position;
    }

    visited = visited.add(position);
  }

  return twice(visited, position, facing, ...rest) 
}

exports.follow = R.curry(follow)([0,0],[0,1]);
exports.distance = R.curry(distance)([0,0]);
exports.twice = R.curry(twice)(immutable.Set.of([0,0]),[0,0],[0,1]);