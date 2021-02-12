// Main application control
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
// import exphbs from 'express-handlebars';
// import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

// Import the routers for the properties and the login
import propertyRouter from './routes/property.router';
import loginRouter from './routes/user.router';
// Import and run the database connection
import './database';
import Config from './config/config';

// Declare and create the app as an Express app
const app = express();

// Settings =========================
Config.isProd();
app.set('port', Config.PORT);
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
app.use(
    cors({
        // origin: [`${process.env.FRONT_URL}`, 'http://localhost:3000'],
        // allowedHeaders: [
        //     'Access-Control-Allow-Credentials',
        //     'Access-Control-Allow-Origin',
        //     'Origin',
        //     'X-Requested-With',
        //     'Content-Type',
        //     'Accept',
        //     'X-Access-Token',
        //     'Authorization',
        // ],
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        // origin: 'http://localhost:3000',
        origin: 'http://localhost:3000',
        credentials: true,
    })
);
app.use(morgan('dev'));

// app.use(express.static(path.join(__dirname + '/uploads')));
app.use(express.static('uploads'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());

// Cookies (session based)
app.use(cookieParser());

declare module 'express-session' {
    export interface SessionData {
        userId: {[key: string]: any};
        loggedUser: {[key: string]: any};
    }
}

app.use(
    session({
        name: Config.SESS_NAME,
        secret: Config.SESS_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: Number(Config.SESS_LIFETIME), // time in miliseconds
            // sameSite: true, // same as 'strict'
            sameSite: false, // same as 'strict'
            secure: Config.IN_PROD,
        },
    })
);


// Routes ===========================
app.use(propertyRouter);
app.use(loginRouter);

// Start ============================
// app.listen(Config.PORT, () => {
app.listen(Config.PORT, () => {
    console.log(`Server on port ===> ${Config.PORT}
                \rDevelopment mode ===> ${Config.MODE_ENV}\n`);
});
