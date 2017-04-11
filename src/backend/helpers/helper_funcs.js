const jwt = require('jsonwebtoken')
const secret = require('../config/main').secret

const catchErrors = function(error_code){
  switch (error_code) {
    case 11000:
      return "Duplicate values"
    default:
      return "Error Unknown"
  }
}

const genToken = function(user){
  const MINUTES = 10;
  return jwt.sign(user, secret, { expiresIn : MINUTES*60 })
}

module.exports = {
    catchErrors : catchErrors,
    genToken : genToken
}