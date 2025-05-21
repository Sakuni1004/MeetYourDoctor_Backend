import { Router } from 'express';
import { register } from '../controllers/userController';
import {createDoctorService, getDoctorByIdService} from "../services/doctorService";
import {
    createDoctorController, deleteDoctorsController,
    getAllDoctorsController,
    updateDoctorsController
} from "../controllers/doctorController";

export const doctorRouter = Router();

doctorRouter.post('/create', createDoctorController);
doctorRouter.get('/all', getAllDoctorsController);
doctorRouter.get('/:id', getDoctorByIdService);
doctorRouter.put('/id', updateDoctorsController);
doctorRouter.delete('/id', deleteDoctorsController);

export default doctorRouter;
