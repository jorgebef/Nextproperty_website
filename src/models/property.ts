import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
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
const Property = mongoose.model('Property', PropertySchema);
export { Property };
