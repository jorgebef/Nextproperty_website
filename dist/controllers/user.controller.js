"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.authVerify = exports.logInPost = exports.logInGet = void 0;
const user_1 = __importDefault(require("../models/user"));
const config_1 = __importDefault(require("../config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Login landing page =========================================================
const logInGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json('Login page!!!');
});
exports.logInGet = logInGet;
// Login post request controller ===============================================
const logInPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        console.log(req.body);
        return res.status(400).json({ msg: 'Please provide both an email and a password' });
    }
    const user = yield user_1.default.findOne({ email: req.body.email });
    // Compare the password typed to the stored one running the method from the
    // Interface and Schema
    const isMatch = yield (user === null || user === void 0 ? void 0 : user.comparePassword(req.body.password));
    if (isMatch) {
        const jwToken = jsonwebtoken_1.default.sign({
            email: req.body.email,
            userId: user === null || user === void 0 ? void 0 : user._id,
        }, config_1.default.SESS_SECRET, { expiresIn: 1000 * 60 * 60 * 24 } // 24h in miliseconds
        );
        console.log('Successful login!!!!!!!!!!');
        return res.status(200)
            // .header('Access-Control-Allow-Origin','*')
            .cookie('token', jwToken, {
            // domain: 'http://nextproperty-client.herokuapp.com',
            httpOnly: false,
            secure: false,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
        })
            .json({
            token: jwToken,
            expiresIn: 900000,
        });
        // return res.status(200)
        //     .cookie('token', jwToken)
        //     .json({
        //         msg: 'successful login',
        //         token: jwToken,
        //         // tokenExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24),
        //     });
    }
    else {
        return res.status(400).json({ msg: 'password is incorrect' });
    }
});
exports.logInPost = logInPost;
const authVerify = (req, res) => {
    var _a;
    // const token = req.cookies.token || '';
    // console.log('cookies: ', req.cookies)
    // console.log('cookies: ', req.headers.cookie)
    const token = ((_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
    // console.log(req);
    console.log('this is the token: ' + token);
    // console.log('cookies:' + req.cookies);
    if (token) {
        // console.log('token found!!');
        jsonwebtoken_1.default.verify(token, config_1.default.SESS_SECRET);
        console.log('token successfully verified');
        res.status(200).json('Token verified');
        return true;
    }
    else {
        console.log('NOT VERIFIED!!!');
        // res.redirect('/api/login');
        res.status(400).json('Not logged in!!');
        return false;
    }
};
exports.authVerify = authVerify;
// Logout post request controller =============================================
const logOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res
        // .cookie('token', null, {
        //     expires: new Date(Date.now()),
        //     secure: false, // set to true if your using https
        //     httpOnly: true,
        // })
        .status(200)
        .json({ msg: 'successfully logged out' });
});
exports.logOut = logOut;
// // Logout post request controller =============================================
// export const logOut = async (req: Request, res: Response): Promise<void> => {
//     req.session?.destroy((err) => {
//         if (err) {
//             res.redirect('/api/properties/list');
//         }
//         res.clearCookie(Config.SESS_NAME);
//         console.log(req.session);
//         res.redirect('/api/login');
//     });
// };
