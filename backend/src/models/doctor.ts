import mongoose, {Schema, Document} from 'mongoose';

export interface IDoctor extends Document {
    firstName: string;
    lastname: string;
    email: string;
    mobileNumber: string;
    doctorCategory: string;
    feedback: string;
    description: string;
    doctorImage: string;
    availableDays: Date[];
    availableTime: {
        start: string,
        end: string
    }

}

const DoctorSchema: Schema = new Schema({
    firstName: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    mobileNumber: {type: String, required: true},
    doctorCategory: {type: String, required: true},
    feedback: {type: String},
    description: {type: String},
    doctorImage: {type: String},
    availableDays: [{ type: Date }],
    availableTime: {
        start: { type: String},
        end: { type: String },
    },
});

export default mongoose.model<IDoctor>('Doctor', DoctorSchema);
