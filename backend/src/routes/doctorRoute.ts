import { Router } from 'express';
import { register } from '../controllers/userController';
import {createDoctorService} from "../services/doctorService";
import {
    createDoctorController, deleteDoctorsController,
    getAllDoctorsController,
    updateDoctorsController
} from "../controllers/doctorController";

export const doctorRouter = Router();

doctorRouter.post('/create', createDoctorController);
doctorRouter.get('/all', getAllDoctorsController);
doctorRouter.put('/update', updateDoctorsController);
doctorRouter.delete('/delete', deleteDoctorsController);



export default doctorRouter;
