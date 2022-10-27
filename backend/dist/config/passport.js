"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require('passport');
const passportJWT = require("passport-jwt");
const user_model_1 = __importDefault(require("../models/user.model"));
var JwtStrategy = passportJWT.Strategy;
var ExtractJwt = passportJWT.ExtractJwt;
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
}, function (jwtPayload, cb) {
    return user_model_1.default.findOne({ id: jwtPayload.id }, function (err, user) {
        if (err) {
            return cb(err, false);
        }
        if (user) {
            return cb(null, user);
        }
        else {
            return cb(null, false);
        }
    });
}));
