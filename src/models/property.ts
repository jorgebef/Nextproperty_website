import mongoose, { Schema, Document } from 'mongoose';

export interface IProp extends Document {
    ref: string;
    title: string;
    description: string;
    images: Array<string>;
}

const PropertySchema: Schema = new Schema({
    ref: {
        type: String,
        required: true,
        uppercase: true,
    },
    title: {
        type: String,
        required: true,
        // lowercase: true,
    },
    description: {
        type: String,
        required: true,
        // lowercase: true,
    },
    images: {
        type: Array,
        required: false,
        lowercase: true,
    },
});

// Mongoose sets the collection name as the plural of the model name
// so in this case the collection will be "properties"
// This model is following the type of the interface IProp
const PropertyModel = mongoose.model<IProp>('Property', PropertySchema);

export default PropertyModel;
