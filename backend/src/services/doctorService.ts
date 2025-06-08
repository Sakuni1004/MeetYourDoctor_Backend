import { IDoctor } from '../models/doctor';
import {
    createDoctorRepo,
    updateDoctorRepo,
    deleteDoctorRepo,
    findDoctorByEmailRepo, getDoctorByIdRepo, getAllDoctorsRepo
} from '../dataAccessRepo/doctorRepo';
// services/doctor.service.ts
import { doctorRepository } from '../dataAccessRepo/doctorRepo';
import { appointmentRepository } from '../dataAccessRepo/appointmentRepo';
import Appointment from "../models/appointment";

export const createDoctorService = async (doctorData: Partial<IDoctor>) => {
    const existing = await findDoctorByEmailRepo(doctorData.email!);
    if (existing) throw new Error('Email already in use');

    return await createDoctorRepo(doctorData);
};

export const getAllDoctorsService = async () => {
    return await getAllDoctorsRepo();
};

export const getDoctorByIdService = async (id: string) => {
    const doctor = await getDoctorByIdRepo(id);
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

export const doctorService = {
    getAvailableSlots: async (doctorId: string, dateStr: string) => {
        const doctor = await doctorRepository.findById(doctorId);
        if (!doctor) throw new Error('Doctor not found');

        const date = new Date(dateStr);
        date.setUTCHours(0, 0, 0, 0);

        const appointments = await appointmentRepository.findConfirmedAppointmentsByDoctorAndDate(doctorId, date);
        const bookedTimes = appointments.map(a => a.startTime);

        const daySlot = doctor.availableSlots.find((slot: any) => {
            const slotDate = new Date(slot.date).toISOString();
            return slotDate === date.toISOString();
        });

        if (!daySlot) return {date: dateStr, timeSlots: []};

        const availableTimeSlots = daySlot.timeSlots.filter(
            (slot: any) => !bookedTimes.includes(slot.start)
        );

        return {
            date: dateStr,
            timeSlots: availableTimeSlots,
        };
    }
}

    //get booked time slots for doctor
export const getBookedTimeSlots = async (doctorId: string, date: string) => {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(targetDate);
    nextDay.setDate(targetDate.getDate() + 1);

    const appointments = await Appointment.find({
        doctor: doctorId,
        date: {
            $gte: targetDate,
            $lt: nextDay,
        },
        status: { $in: ['confirmed'] },
    });

    const bookedSlots = appointments.map(app => ({
        start: app.startTime,
        end: app.endTime,
    }));

    return bookedSlots;
};


