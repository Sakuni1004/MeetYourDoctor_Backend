import { IDoctor } from '../models/doctor';
import {
    createDoctorRepo,
    getAllDoctors,
    getDoctorById,
    updateDoctorRepo,
    deleteDoctorRepo,
    findDoctorByEmail
} from '../dataAccessRepo/doctorRepo';

export const createDoctorService = async (doctorData: Partial<IDoctor>) => {
    const existing = await findDoctorByEmail(doctorData.email!);
    if (existing) throw new Error('Email already in use');

    return await createDoctorRepo(doctorData);
};

export const getAllDoctorsService = async () => {
    return await getAllDoctors();
};

export const getDoctorByIdService = async (id: string) => {
    const doctor = await getDoctorById(id);
    if (!doctor) throw new Error('Doctor not found');
    return doctor;
};

export const updateDoctorsService = async (id: string, data: Partial<IDoctor>) => {
    const updated = await updateDoctorRepo(id, data);
    if (!updated) throw new Error('Doctor not found');
    return updated;
};

export const deleteDoctorsService = async (id: string) => {
    const deleted = await deleteDoctorRepo(id);
    if (!deleted) throw new Error('Doctor not found');
    return deleted;
};
