import { Request, Response } from 'express';
import {
    createDoctorService,
    deleteDoctorsService,
    getAllDoctorsService,
    getDoctorByIdService,
    updateDoctorsService
} from "../services/doctorService";


export const createDoctorController = async (req: Request, res: Response) => {
    try {
        const doctor = await createDoctorService(req.body);
        res.status(201).json({ message: 'Doctor registered successfully', doctor });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const getAllDoctorsController = async (_req: Request, res: Response) => {
    try {
        const doctors = await getAllDoctorsService();
        res.json(doctors);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getDoctorByIdntroller = async (req: Request, res: Response) => {
    try {
        const doctor = await getDoctorByIdService(req.params.id);
        res.json(doctor);
    } catch (err: any) {
        res.status(404).json({ error: err.message });
    }
};

export const updateDoctorsController = async (req: Request, res: Response) => {
    try {
        const doctor = await updateDoctorsService(req.params.id, req.body);
        res.json(doctor);
    } catch (err: any) {
        res.status(404).json({ error: err.message });
    }
};

export const deleteDoctorsController = async (req: Request, res: Response) => {
    try {
        await deleteDoctorsService(req.params.id);
        res.json({ message: 'Doctor deleted successfully' });
    } catch (err: any) {
        res.status(404).json({ error: err.message });
    }
};
