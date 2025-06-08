import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
    doctor: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    date: Date;
    startTime: string;
    endTime: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

const AppointmentSchema: Schema = new Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'confirmed'
    }
}, {
    timestamps: true
});

export default mongoose.model<IAppointment>('Appointment', AppointmentSchema);
