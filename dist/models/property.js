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
const mongoose_1 = __importStar(require("mongoose"));
const PropertySchema = new mongoose_1.Schema({
    created_timestamp: {
        type: Number,
        required: true,
    },
    edited_timestamp: {
        type: Number,
        required: false,
    },
    ref: {
        type: String,
        required: true,
        uppercase: true,
    },
    price: {
        type: Number,
        required: true,
    },
    new_build: {
        type: Boolean,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    town: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    lat: {
        type: Number,
        required: false,
    },
    long: {
        type: Number,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    images: {
        type: Array,
        required: false,
    },
});
// Mongoose sets the collection name as the plural of the model name
// so in this case the collection will be "properties"
// This model is following the type of the interface IProp
const PropertyModel = mongoose_1.default.model('Property', PropertySchema);
exports.default = PropertyModel;
