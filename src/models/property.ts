import { Schema, model } from 'mongoose';

const PropertySchema = new Schema({
    title: {
        type: String,
        required: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
        lowercase: true,
    },
});

// Mongoose sets the collection name as the plural of the model name
// so in this case the collection will be "properties"
export default model('Property', PropertySchema);
