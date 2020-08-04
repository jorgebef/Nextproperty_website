// File with all our configs stored and exported to use
// ----------------------------------------------------
import { ConnectionOptions } from 'mongoose';

export const db_conf = {
    URI:
        process.env.MONGODB_URI ||
        'mongodb+srv://nextproperty_admin:ulFhgVlTOPwJTzS5@nextproperty.zdoec.mongodb.net/nextproperty?retryWrites=true&w=majority',
    USER: process.env.MONGODB_USER,
    PASSWORD: process.env.MONGODB_PASSWORD,
};

export const db_options: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

export const config = {
    PORT: process.env.PORT || '3000',
    MODE_ENV: process.env.MODE_ENV,
    SESS_SECRET: process.env.SESS_SECRET || 'somesecretforthesession',
    SESS_LIFETIME: 1000 * 60 * 60 * 24,
    SESS_NAME: 'sid',
    IN_PROD: false,
};

config.IN_PROD = config.MODE_ENV === 'production';
