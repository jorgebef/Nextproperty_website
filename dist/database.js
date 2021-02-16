"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Import the params from config.ts file
const config_1 = __importDefault(require("./config/config"));
mongoose_1.default.connect(config_1.default.MONGODB_URI, config_1.default.CONNECT_OPTIONS);
mongoose_1.default.connection.once('open', () => {
    console.log('**Database Connected**');
});
mongoose_1.default.connection.on('error', (err) => {
    console.log(err);
    process.exit(0);
});
