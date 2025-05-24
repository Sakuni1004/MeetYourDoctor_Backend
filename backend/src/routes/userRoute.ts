import { Router } from 'express';
import { signupController} from '../controllers/userController';


const userRoutes = Router();

userRoutes.post('/register', signupController);

export default userRoutes;

