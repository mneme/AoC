const crypto = require('crypto');

function md5(str){
    const sum = crypto.createHash('md5');
    sum.update(str);
    return sum.digest('hex');
}

function interesting(n){
  return (n.slice(0,5) === '00000');
}

function* sequence(){
  let i = 1;
  while(true){
    yield i++;
  }
}

function* generate(str) {
  let hits = 0;
  const numbers = sequence();
  while (true) {
    let i = numbers.next(),
        val = md5(str+i.value);
    
    if(interesting(val)){
      hits++;
      yield val;
    };
  }
}

function complete(password){
  return (password.split("_").length - 1) === 0;
}

function addBasic(pass, str){
  let char = str.charAt(5);
  let i = pass.indexOf('_');
  return setCharAt(pass, char, i);
}

function addIndex(pass, str){
  let char = str.charAt(6);
  let i = parseInt(str.charAt(5));
  if(i >= 0 && i < pass.length && pass.charAt(i) === '_'){
    return setCharAt(pass, char, i); 
  }
  return pass;
}

function setCharAt(str, char, i){
  return str.substr(0, i) + char + str.substr(i + 1);
}

function password(builder, input){
  let password = "________";

  for (let val of generate(input, 8)) {
    password = builder(password, val);
    console.log(password);
    //process.stdout.write('.');
    if(complete(password))
      break;
  }
  return password;
}

password(addIndex, 'ojvtpuvg');
password(addBasic,'ojvtpuvg');