'use strict'
const R = require('ramda');


const groupEncryptedName = R.compose(R.toPairs,R.countBy(R.identity)),
      parse = R.compose(R.map(parseRow),R.split('\n'));

function parseRow(row){
  const matches = row.match(/(.+)-(\d*)\[(.+)\]/);
  return [matches[1], parseInt(matches[2]), matches[3]];
}

function checksum(name){
  return R.compose(
    R.join(''),
    R.map(R.head),
    R.take(5),
    R.sort((a, b) => {
      if (a[1] === b[1])
        return a[0] < b[0] ? -1 : 1;
      return b[1] - a[1];
    }), 
    groupEncryptedName,
    R.replace(/-/g, '')
  )(name);
}

function shift(char, n){
  return String.fromCharCode((char.charCodeAt(0) - 97 + n) % 26 + 97)
}

function valid(row){
  return row[2] === checksum(row[0])
}

function decrypt(row){
  return [R.map((char) => char === '-' ? ' ' : shift(char,row[1]),row[0].split('')).join(''), row[1], row[2]];
}

exports.apply = function(input){
  return R.compose(
    R.sum,
    R.map(R.nth(1)),
    R.filter(R.curry(valid)),
    parse
  )(input)
}

exports.apply2= function(input, find){
  return R.compose(
    R.nth(1),
    R.find((row) => row[0].match(find)),
    R.map(decrypt),
    R.filter(R.curry(valid)),
    parse
  )(input);
}