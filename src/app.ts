// Main application control
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import path from 'path';
import cors from 'cors';

// Import the routers for the properties and the login
import propertyRouter from './routes/property.router';
import loginRouter from './routes/auth.router';
// Import and run the database connection
import './database';

// Declare and create the app as an Express app
const app = express();
const {
    PORT = process.env.PORT || '3000',
    NODE_ENV = 'dev',
    SESS_SECRET = 'somesecretforthesession',
    SESS_LIFETIME = 1000 * 60 * 60 * 24,
    SESS_NAME = 'sid',
} = process.env;
const IN_PROD = NODE_ENV === 'prod';

// Settings =========================
app.set('port', PORT);
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
        name: SESS_NAME,
        secret: SESS_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: Number(SESS_LIFETIME), // time in miliseconds
            sameSite: true, // same as 'strict'
            secure: IN_PROD,
        },
    })
);
//

// Routes ===========================
app.use(propertyRouter);
app.use(loginRouter);

// Start ============================
app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`);
});
