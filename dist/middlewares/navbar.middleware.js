"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
exports.data = {};
exports.data.assignSession = (req) => {
    var _a, _b;
    const userid = (_a = req.session) === null || _a === void 0 ? void 0 : _a.userId;
    const loggedUser = (_b = req.session) === null || _b === void 0 ? void 0 : _b.loggedUser;
    exports.data.session = { userid, loggedUser };
};
exports.data.assignNavActive = (req) => {
    // extract the last word of the url path
    const navActive = req.path.slice(req.path.lastIndexOf('/') + 1);
    console.log(navActive);
    exports.data.navbar = { [navActive]: true };
};
