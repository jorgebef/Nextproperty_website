import mongoose, { Schema, Document } from 'mongoose';

export interface IProp extends Document {
    created_timestamp: number;
    edited_timestamp?: number;
    ref: string;
    price: number;
    new_build: boolean;
    type: string;
    town: string;
    province: string;
    lat?: number;
    long?: number;
    title: string;
    description?: string;
    images?: Array<string>;
}

const PropertySchema: Schema = new Schema({
    created_timestamp: {
        type: Number,
        required: true,
        // lowercase: true,
    },
    edited_timestamp: {
        type: Number,
        required: false,
        // lowercase: true,
    },
    ref: {
        type: String,
        required: true,
        uppercase: true,
    },
    price: {
        type: Number,
        required: true,
    },
    new_build: {
        type: Boolean,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    town: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    lat: {
        type: Number,
        required: false,
    },
    long: {
        type: Number,
        required: false,
    },
    title: {
        type: String,
        required: true,
        // lowercase: true,
    },
    description: {
        type: String,
        required: false,
        // lowercase: true,
    },
    images: {
        type: Array,
        required: false,
        // lowercase: true,
    },
});

// Mongoose sets the collection name as the plural of the model name
// so in this case the collection will be "properties"
// This model is following the type of the interface IProp
const PropertyModel = mongoose.model<IProp>('Property', PropertySchema);

export default PropertyModel;
