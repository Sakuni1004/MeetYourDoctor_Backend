import { Request, Response } from 'express';
import * as appointmentService from '../services/appointmentServices';
import {createAppointmentService} from "../services/appointmentServices";

//get all time slots according to doctor id and date
export const getDoctorAvailableSlots = async (req: Request, res: Response) => {
    try {
        const doctorId = req.params.doctorId;
        const dateParam = req.query.date as string;

        if (!doctorId || !dateParam) {
            return res.status(400).json({ message: 'Doctor ID and date are required' });
        }

        const date = new Date(dateParam);
        if (isNaN(date.getTime())) {
            return res.status(400).json({ message: 'Invalid date format' });
        }

        const availableSlots = await appointmentService.getAvailableTimeSlots(doctorId, date);
        return res.status(200).json({ availableSlots });
    } catch (error) {
        console.error('Error fetching available slots:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


export const createAppointmentController = async (req: Request, res: Response) => {
    try {
        const appointmentData = req.body;
        const appointment = await createAppointmentService(appointmentData);
        return res.status(201).json(appointment);
    } catch (error: any) {
        console.error('Error creating appointment:', error);
        return res.status(500).json({ message: error.message || 'Failed to create appointment' });
    }
};
