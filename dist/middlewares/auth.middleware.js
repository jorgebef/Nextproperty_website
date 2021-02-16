"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirHome = exports.redirLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
// confirm whether the user is authenticated
// const authenticated = passport.authenticate('jwt', { session: false });
const redirLogin = (req, res, next) => {
    // const token = req?.headers?.authorization?.split(' ')[1];
    const token = req.cookies.token || '';
    // const token = req.headers['authorization']?.split(' ')[1] || '';
    console.log('this is the token: ' + token);
    if (token) {
        console.log('token found!!');
        console.log(token);
        jsonwebtoken_1.default.verify(token, config_1.default.SESS_SECRET);
        console.log('token successfully verified');
        next();
    }
    else {
        console.log('Redirecting to Login screen');
        // res.redirect('/api/login');
        res.status(403).json('Not logged in!!');
    }
};
exports.redirLogin = redirLogin;
// Avoid relogging in by redirecting from login to list page if already logged in
const redirHome = (req, res, next) => {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.userId) {
        // res.redirect('/api/properties/list');
        next();
    }
    else {
        next();
    }
};
exports.redirHome = redirHome;
