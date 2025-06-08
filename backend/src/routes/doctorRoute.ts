import { Router } from 'express';
import {
    createDoctorController, deleteDoctorsController, doctorController,
    getAllDoctorsController, getBookedSlotsController, getDoctorByIdController,
    updateDoctorsController
} from "../controllers/doctorController";


export const doctorRouter = Router();

doctorRouter.post('/create', createDoctorController);
doctorRouter.get('/all', getAllDoctorsController);
doctorRouter.get('/:id', getDoctorByIdController);
doctorRouter.put('/:id', updateDoctorsController);
doctorRouter.delete('/:id', deleteDoctorsController);

doctorRouter.get('/:doctorId/available-slots', doctorController.getAvailableTimeSlots);
doctorRouter.get('/:doctorId/booked-slots',getBookedSlotsController)

export default doctorRouter;
