import { Router } from 'express';
import { register } from '../controllers/userController';

const router = Router();

router.post('/signup', register);

export default router;
