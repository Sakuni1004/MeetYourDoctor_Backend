import Appointment, {IAppointment} from '../models/appointment';

export const getAppointmentsByDoctorAndDate = async (doctorId: string, date: Date) => {
    const targetDate = new Date(date.toISOString().split('T')[0]);

    return await Appointment.find({
        doctor: doctorId,
        date: targetDate
    });
};

export const appointmentRepository = {
    findConfirmedAppointmentsByDoctorAndDate: (doctorId: string, date: Date) => {
        const dateStart = new Date(date);
        dateStart.setUTCHours(0, 0, 0, 0);

        const dateEnd = new Date(dateStart);
        dateEnd.setUTCDate(dateEnd.getUTCDate() + 1);

        return Appointment.find({
            doctor: doctorId,
            date: { $gte: dateStart, $lt: dateEnd },
            status: 'confirmed',
        }).lean();
    }
};

export const createAppointmentRepo = async (data: Partial<IAppointment>): Promise<IAppointment> => {
    const appointment = new Appointment(data);
    return appointment.save();
};
