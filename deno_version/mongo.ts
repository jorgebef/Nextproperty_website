import { MongoClient } from './dependencies.ts';

//ulFhgVlTOPwJTzS5

const client = new MongoClient();
client.connectWithUri(
    'mongodb+srv://nextproperty_admin:ulFhgVlTOPwJTzS5@nextproperty.zdoec.mongodb.net/nextproperty?retryWrites=true&w=majority'
);

const db = client.database('nextproperty');

export default db;
