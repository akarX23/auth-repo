const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { MD5 } = require("crypto-js");

// bcrypt.genSalt(10, (err, salt) => {
//   if (err) return next(err);

//   bcrypt.hash("password123", salt, (err, hash) => {
//     if (err) return next(err);
//   });
// });

// const secret = "mysecretpassword";
// const secretSalt = "iidfjiwjoiw";

// const user = {
//   id: 1,
//   token: MD5("Password").toString() + secretSalt,
// };

// console.log(user);

const id = "1000";
const secret = "supersecret";

const receivedToken =
  "eyJhbGciOiJIUzI1NiJ9.MTAwMA.L9PmEqLlZjettygguzj25agunJu6NkvVtG9RFRBnK2Y";

const token = jwt.sign(id, secret);
const decodeToken = jwt.verify(receivedToken, secret);

console.log(decodeToken);
