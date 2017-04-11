var JwtStrategy = require("passport-jwt").Strategy
var ExtractJwt = require("passport-jwt").ExtractJwt

var config = require("../config/main")
var User = require("../models/user").userModel

module.exports = function(passport){
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret
    passport.use(new JwtStrategy(opts, function(jwt_payload, done){
        const thisUserId = jwt_payload._doc._id
        User.findById(thisUserId, function(err, user){
            if(err){
                return done(err, false)
            }
            if(user){
                done(null, user)
            }
            else{
                done(null, false)
            }
        })
    }))
}