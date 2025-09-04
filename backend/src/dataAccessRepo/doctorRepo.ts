import Doctor, { IDoctor } from '../models/doctor';
import { Types } from 'mongoose';

export const createDoctorRepo = async (data: Partial<IDoctor>): Promise<IDoctor> => {
    const doctor = new Doctor(data);
    return doctor.save();
};

export const getAllDoctorsRepo = async (): Promise<IDoctor[]> => {
    return Doctor.find();
};

export const getDoctorByIdRepo = async (id: string): Promise<IDoctor | null> => {
    return Doctor.findById(id);
};
export const findDoctorByEmailRepo = async (email: string): Promise<IDoctor | null> => {
    return Doctor.findOne({ email });
};


export const updateDoctorRepo = async (id: string, data: Partial<IDoctor>): Promise<IDoctor | null> => {
    return Doctor.findByIdAndUpdate(id, data, { new: true });
};

export const deleteDoctorRepo = async (id: string): Promise<IDoctor | null> => {
    return Doctor.findByIdAndDelete(id);
};
