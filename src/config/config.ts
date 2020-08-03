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
