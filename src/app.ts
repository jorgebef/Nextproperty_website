// Main application control
import express from 'express';
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import path from 'path';

import router from './router';
import connect_db from './database';

class Application {
    app: express.Application;

    constructor() {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', 3000);
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.engine(
            'hbs',
            exphbs({
                // sets the folder where it searches for layouts
                layoutsDir: path.join(this.app.get('views'), 'layouts'),
                // sets the folder where it searches for partials
                partialsDir: path.join(this.app.get('views'), 'partials'),
                // sets the default template inside /views/layout that is
                // rendered as the default page and is the base for all others
                defaultLayout: 'main',
                extname: '.hbs',
            })
        );
        this.app.set('view engine', '.hbs');
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes() {
        // Uses all routes from router.ts
        this.app.use(router);
    }

    start() {
        const server_port = this.app.get('port');
        this.app.listen(server_port, () => {
            console.log(`Server running on port ${server_port}`);
        });
    }
}

const app = new Application();
connect_db();
app.start();
