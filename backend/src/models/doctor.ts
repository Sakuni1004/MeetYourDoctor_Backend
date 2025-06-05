import mongoose, {Schema, Document} from 'mongoose';

interface TimeSlot {
    start: string;
    end: string;
}

interface DateSlot {
    date: Date;
    timeSlots: TimeSlot[];
}

export interface IDoctor extends Document {
    id: string;
    name: string;
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
    }[];
    payment: number;
    availableSlots: DateSlot[];

}

const DoctorSchema: Schema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    mobileNumber: {type: String, required: true},
    doctorCategory: {type: String, required: true},
    feedback: {type: String},
    description: {type: String},
    doctorImage: {type: String},
    availableDays: [{ type: Date }],
    availableTime: [
        {
            start: { type: String },
            end: { type: String },
        },
    ],
    payment: { type: Number, required: true, default: 500 },
    availableSlots: [
        {
            date: { type: Date, required: true },
            timeSlots: [
                {
                    start: { type: String, required: true },
                    end: { type: String, required: true },
                },
            ],
        },
    ],
});


export default mongoose.model<IDoctor>('Doctor', DoctorSchema);
