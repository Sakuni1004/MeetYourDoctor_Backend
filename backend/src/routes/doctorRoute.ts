import { Router } from 'express';
import {
    createDoctorController, deleteDoctorsController,
    getAllDoctorsController, getDoctorByIdController,
    updateDoctorsController
} from "../controllers/doctorController";

export const doctorRouter = Router();

doctorRouter.post('/create', createDoctorController);
doctorRouter.get('/all', getAllDoctorsController);
doctorRouter.get('/:id', getDoctorByIdController);
doctorRouter.put('/:id', updateDoctorsController);
doctorRouter.delete('/:id', deleteDoctorsController);

export default doctorRouter;
