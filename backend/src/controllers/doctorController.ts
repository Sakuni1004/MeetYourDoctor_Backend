import { Request, Response } from 'express';
import {
    createDoctorService,
    deleteDoctorsService,
    getAllDoctorsService, getBookedTimeSlots,
    getDoctorByIdService,
    updateDoctorsService
} from "../services/doctorService";
import { doctorService } from '../services/doctorService';


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

export const getDoctorByIdController = async (req: Request, res: Response) => {
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

//get still available time slots
export const doctorController = {
    getAvailableTimeSlots: async (req: Request, res: Response) => {
        try {
            const { doctorId } = req.params;
            const { date } = req.query;

            if (!date || typeof date !== 'string') {
                return res.status(400).json({ message: 'Date query param is required' });
            }

            const result = await doctorService.getAvailableSlots(doctorId, date);
            res.json(result);
        } catch (err: any) {
            res.status(500).json({ message: err.message || 'Server error' });
        }
    }
};
// get booked timeslots for doctor
export const getBookedSlotsController = async (req: Request, res: Response) => {
    const { doctorId } = req.params;
    const { date } = req.query;

    if (!date || typeof date !== 'string') {
        return res.status(400).json({ message: 'Date query param is required (YYYY-MM-DD)' });
    }

    try {
        const bookedSlots = await getBookedTimeSlots(doctorId, date);
        return res.status(200).json(bookedSlots);
    } catch (error: any) {
        return res.status(500).json({ message: error.message || 'Internal server error' });
    }
};
