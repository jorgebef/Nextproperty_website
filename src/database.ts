import mongoose from 'mongoose';
// Import the params from config.ts file
import Config from './config/config';

mongoose.connect(Config.MONGODB_URI, Config.CONNECT_OPTIONS);
// mongoose.connection.once('open', () => {
//     console.log('**Database Connected**');
// });
// mongoose.connection.on('error', (err) => {
//     console.log(err);
//     process.exit(0);
// });
