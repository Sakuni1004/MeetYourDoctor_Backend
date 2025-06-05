import mongoose, { Schema, Document } from 'mongoose';

export interface IFavouriteDoctors extends Document {
    userId: string;
    doctorId: string;
}

const FavouriteDoctorsSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
}, { timestamps: true });

export default mongoose.model<IFavouriteDoctors>('FavouriteDoctors', FavouriteDoctorsSchema);
