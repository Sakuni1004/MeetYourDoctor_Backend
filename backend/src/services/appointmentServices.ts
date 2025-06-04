import moment from 'moment';
import { getDoctorByIdRepo } from '../dataAccessRepo/doctorRepo';
import {createAppointmentRepo, getAppointmentsByDoctorAndDate} from '../dataAccessRepo/appointmentRepo';
import {IAppointment} from "../models/appointment";

export const getAvailableTimeSlots = async (doctorId: string, date: Date) => {
    const doctor = await getDoctorByIdRepo(doctorId);
    if (!doctor) throw new Error('Doctor not found');

    const dateStr = new Date(date).toISOString().split('T')[0];

    const appointments = await getAppointmentsByDoctorAndDate(doctorId, date);

    console.log('Doctor:', doctorId);
    console.log('Looking for appointments on date:', dateStr);
    console.log('Raw appointments:', appointments);

    const bookedSlots = new Set(
        appointments.map(a => {
            const startStr = moment(a.startTime).format('hh:mm A');
            const endStr = moment(a.endTime).format('hh:mm A');
            console.log("start",startStr);
            console.log("end",endStr);

            return `${startStr}-${endStr}`;
        })
    );

    console.log('Booked slots:', bookedSlots);

    const daySlots = doctor.availableSlots.find(slot =>
        new Date(slot.date).toISOString().split('T')[0] === dateStr
    );

    if (!daySlots) return [];

    const freeSlots = daySlots.timeSlots.filter(slot => {
        const key = `${slot.start}-${slot.end}`;
        return !bookedSlots.has(key);
    });

    return freeSlots;
};

export const createAppointmentService = async (data: Partial<IAppointment>): Promise<IAppointment> => {
    if (!data.doctor || !data.date || !data.startTime || !data.endTime) {
        throw new Error('Missing required appointment data');
    }

    // Convert to Date object safely
    const parsedDate = new Date(data.date);
    if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date format');
    }

    const doctor = await getDoctorByIdRepo(data.doctor.toString());
    if (!doctor) {
        throw new Error('Doctor not found');
    }

    const appointmentDateStr = parsedDate.toISOString().split('T')[0];
    const availableDay = doctor.availableSlots.find(slot => {
        return new Date(slot.date).toISOString().split('T')[0] === appointmentDateStr;
    });

    if (!availableDay) {
        throw new Error('Doctor is not available on the selected date');
    }

    const requestedSlot = availableDay.timeSlots.find(slot =>
        slot.start === data.startTime && slot.end === data.endTime
    );

    if (!requestedSlot) {
        throw new Error('Requested time slot is not available for this doctor');
    }

    const appointments = await getAppointmentsByDoctorAndDate(data.doctor.toString(), parsedDate);

    const isBooked = appointments.some(appointment =>
        appointment.startTime === data.startTime && appointment.endTime === data.endTime
    );

    if (isBooked) {
        throw new Error('This time slot is already booked');
    }

    const appointment = await createAppointmentRepo({
        ...data,
        date: parsedDate
    });

    return appointment;
};
