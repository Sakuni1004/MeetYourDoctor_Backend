import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    fullName: string;
    password: string;
    email: string;
    mobileNumber: string;
}

const UserSchema: Schema = new Schema({
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true }
});

export default mongoose.model<IUser>('User', UserSchema);
