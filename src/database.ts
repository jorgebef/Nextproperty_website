import mongoose from 'mongoose';
// Import the params from config.ts file
import * as conf from './api/config/config';

mongoose.connect(conf.db_conf.URI, conf.db_options);
mongoose.connection.once('open', () => {
    console.log('>>>Database Connected');
});
mongoose.connection.on('error', (err) => {
    console.log(err);
    process.exit(0);
});
