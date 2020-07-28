import mongoose, { Schema, model } from 'mongoose';

async function connect_db() {
    try {
        mongoose.connect(
            'mongodb+srv://nextproperty_admin:ulFhgVlTOPwJTzS5@nextproperty.zdoec.mongodb.net/nextproperty?retryWrites=true&w=majority',
            {
                // (node:30246) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and
                // will be removed in a future version. To use the new Server Discover and Monitoring engine, pass
                // option { useUnifiedTopology: true } to the MongoClient constructor.
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log('>>>Database Connected');
    } catch {
        console.log('Database connectino error');
    }
}

export default connect_db;
