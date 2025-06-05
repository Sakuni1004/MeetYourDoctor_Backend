import { Router } from 'express';
import {createAppointmentController, getDoctorAvailableSlots} from "../controllers/appointmentController";
export const appointmentRouter = Router();
appointmentRouter.get('/:doctorId', getDoctorAvailableSlots);
appointmentRouter.post('/create',createAppointmentController);

export default appointmentRouter;
