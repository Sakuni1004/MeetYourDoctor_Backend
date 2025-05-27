import express from 'express';
import {signup, login, refreshAccessToken, updateUserByIdController} from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/refresh-token', refreshAccessToken);
authRouter.put('/update/:id',updateUserByIdController);


export default authRouter;
