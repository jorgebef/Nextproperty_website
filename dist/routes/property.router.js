"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// File that contains all the property routes for the application
const express_1 = require("express");
// importing all functions form the property controller module as p_c
const PropControl = __importStar(require("../controllers/property.controller"));
const propertyRouter = express_1.Router();
// Create properties
// propertyRouter.route('/api/property/create').get(PropControl.createGet).post(redirLogin, PropControl.createPost);
propertyRouter.route('/api/property/create').get(PropControl.createGet).post(PropControl.createPost);
// List properties
// propertyRouter.route('/api/property/list').get(redirLogin, PropControl.listGet);
propertyRouter.route('/api/property/list').get(PropControl.listGet);
// Edit properties
// propertyRouter.route('/api/property/:id').get(redirLogin, PropControl.propGet);
propertyRouter.route('/api/property/:id').get(PropControl.propGet);
// propertyRouter.route('/api/property/edit/:id').put(redirLogin, PropControl.editPost);
propertyRouter.route('/api/property/edit/:id').put(PropControl.editPost);
// Delete properties
// propertyRouter.route('/api/property/delete/:id').delete(redirLogin, PropControl.deleteGet);
propertyRouter.route('/api/property/delete/:id').delete(PropControl.deleteGet);
// Images for properties route =============================================================
exports.default = propertyRouter;
