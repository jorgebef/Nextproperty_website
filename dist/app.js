"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Main application control
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
// import exphbs from 'express-handlebars';
// import path from 'path';
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
// Import the routers for the properties and the login
const property_router_1 = __importDefault(require("./routes/property.router"));
const user_router_1 = __importDefault(require("./routes/user.router"));
// Import and run the database connection
require("./database");
const config_1 = __importDefault(require("./config/config"));
// Declare and create the app as an Express app
const app = express_1.default();
// Cookies (session based)
app.use(cookie_parser_1.default());
// Settings =========================
config_1.default.isProd();
app.set('port', config_1.default.PORT);
// app.set('views', path.join(__dirname, 'views'));
// app.engine(
//     'hbs',
//     exphbs({
//         // sets the folder where it searches for layouts
//         layoutsDir: path.join(app.get('views'), 'layouts'),
//         // sets the folder where it searches for partials
//         partialsDir: path.join(app.get('views'), 'partials'),
//         // sets the default template inside /views/layout that is
//         // rendered as the default page and is the base for all others
//         defaultLayout: 'main',
//         extname: '.hbs',
//     })
// );
// app.set('view engine', '.hbs');
// Middlewares ======================
app.use(cors_1.default({
    // origin: [`${process.env.FRONT_URL}`, 'http://localhost:3000'],
    allowedHeaders: [
        'Access-Control-Allow-Credentials',
        'Access-Control-Allow-Origin',
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
        'Authorization',
    ],
    // methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    // origin: 'http://localhost:3000',
    origin: ['http://82.223.103.157:3000', 'http://localhost:3000'],
    // origin: 'http://nextproperty-client.herokuapp.com',
    credentials: true,
}));
app.use(morgan_1.default('dev'));
// app.use(express.static(path.join(__dirname + '/uploads')));
app.use(express_1.default.static('uploads'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_fileupload_1.default());
// app.use(
//     session({
//         name: Config.SESS_NAME,
//         secret: Config.SESS_SECRET,
//         resave: false,
//         saveUninitialized: false,
//         cookie: {
//             maxAge: Number(Config.SESS_LIFETIME), // time in miliseconds
//             // sameSite: true, // same as 'strict'
//             sameSite: false, // same as 'strict'
//             secure: Config.IN_PROD,
//         },
//     })
// );
// Routes ===========================
app.get('/*', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '/'), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});
app.use(property_router_1.default);
app.use(user_router_1.default);
// Start ============================
// app.listen(Config.PORT, () => {
app.listen(config_1.default.PORT, () => {
    console.log(`Server on port ===> ${config_1.default.PORT}
                \rDevelopment mode ===> ${config_1.default.MODE_ENV}\n`);
});
