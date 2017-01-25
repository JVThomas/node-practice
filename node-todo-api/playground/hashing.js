//const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
  id: 4
}

let token = jwt.sign(data, '123abc');
console.log(token);

//jwt throws error if the signature is invalid
let decoded = jwt.verify(token, '123abc');
console.log('Decoded: ', decoded);


// let msg = "I am User # 45";
// let hash = SHA256(msg).toString();
//
// console.log(`Message: ${msg}`);
// console.log(`Hash: ${hash}`);

// let data = {
//   id: 5,
// }
//
// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// token.data.id = 6;
// token.hash = SHA256(JSON.stringify(token.date)).toString();
//
// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (resultHash === token.hash){
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed! Do not trust!');
// }
