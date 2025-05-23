import mongoose, {Document, Schema} from "mongoose";
import {IDoctor} from "./doctor";
import {IUser} from "./user";

export interface IAppointment extends Document {
    doctor: IDoctor;
    patientName: IUser;
    date: Date;
    time: string;
    reason: string;
    status: string;

}

const AppointmentSchema = new Schema({
    doctor: { type: Schema.Types.ObjectId},
    patientName: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    reason: String,
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
});

export default mongoose.model<IAppointment>('Appointment', AppointmentSchema);
