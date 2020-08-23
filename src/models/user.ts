import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    email: string;
    password: string;
    comparePassword: (inserted_password: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// UserSchema.pre<IUser>('save', async function (next: any) {
//     console.log(this);
//     // If the password hasn't been modified just jump to next
//     if (!this.isModified('password')) return next();
//     // Use bcrypt to encrypt the password, salt 10 times and store the hash
//     // instead of plain text
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(this.password, salt);
//     this.password = hash;
//     next();
//     return true;
// });

// Method to compare the password typed to the actual password
UserSchema.methods.comparePassword = async function (inserted_password: string): Promise<boolean> {
    return await bcrypt.compare(inserted_password, this.password);
};

// Mongoose sets the collection name as the plural of the model name
// so in this case the collection will be "users"
// This model is following the type of the interface IUser
const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
