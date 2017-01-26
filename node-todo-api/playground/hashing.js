//const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = 'abc123';

//first argument is the number of rounds, second is callback
//for password hashing, longer tends to be more secure
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });
//
let hashedPassword = '$2a$10$sa456/FTBvnbelS62JEG2.HxCrPleg9OExc670rWlC9cVZxBEYR9O';

//takes the plain value and the hash value and checks if they're equal
bcrypt.compare(password, hashedPassword, (err, res) =>{
  console.log(res);
});
// let data = {
//   id: 4
// }
//
// let token = jwt.sign(data, '123abc');
// console.log(token);
//
// //jwt throws error if the signature is invalid
// let decoded = jwt.verify(token, '123abc');
// console.log('Decoded: ', decoded);


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
