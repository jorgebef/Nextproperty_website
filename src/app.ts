// Main application control
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';

// Import the routers for the properties and the login
import propertyRouter from './api/routes/property.router';
import loginRouter from './api/routes/user.router';
// Import and run the database connection
import './database';
import { config } from './api/config/config';

// Declare and create the app as an Express app
const app = express();
dotenv.config();

// Settings =========================
app.set('port', config.PORT);
app.set('views', path.join(__dirname, 'views'));
app.engine(
    'hbs',
    exphbs({
        // sets the folder where it searches for layouts
        layoutsDir: path.join(app.get('views'), 'layouts'),
        // sets the folder where it searches for partials
        partialsDir: path.join(app.get('views'), 'partials'),
        // sets the default template inside /views/layout that is
        // rendered as the default page and is the base for all others
        defaultLayout: 'main',
        extname: '.hbs',
    })
);
app.set('view engine', '.hbs');

// Middlewares ======================
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Cookies (session based)
app.use(
    session({
        name: config.SESS_NAME,
        secret: config.SESS_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: Number(config.SESS_LIFETIME), // time in miliseconds
            sameSite: true, // same as 'strict'
            secure: config.IN_PROD,
        },
    })
);
//

// Routes ===========================
app.use(propertyRouter);
app.use(loginRouter);

// Start ============================
app.listen(config.PORT, () => {
    console.log(
        `
        Server runing on port ${config.PORT} and the development mode is ${config.MODE_ENV}
        `
    );
});
