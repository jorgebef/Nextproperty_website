"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// File with all our configs stored and exported to use
// ----------------------------------------------------
const dotenv_1 = __importDefault(require("dotenv"));
// Read from .env file
dotenv_1.default.config();
exports.default = {
    // Main configuration variables =======================
    PORT: process.env.PORT || '3000',
    MODE_ENV: process.env.MODE_ENV || 'devel',
    IN_PROD: false,
    // Session or Cookie config variables =================
    SESS_SECRET: process.env.SESS_SECRET || 'somesecretforthesession',
    SESS_LIFETIME: 1000 * 60 * 60 * 24,
    SESS_NAME: process.env.SESS_NAME || 'sid',
    // DB config variables ================================
    MONGODB_URI: process.env.MONGODB_URI || 'kekw',
    USER: process.env.MONGODB_USER,
    PASSWORD: process.env.MONGODB_PASSWORD,
    CONNECT_OPTIONS: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    isProd() {
        this.IN_PROD = this.MODE_ENV === 'production';
    },
};
// config.IN_PROD = config.MODE_ENV === 'production';
