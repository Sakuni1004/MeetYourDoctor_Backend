import express from 'express';
import {signup, login, refreshAccessToken} from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/refresh-token', refreshAccessToken);


export default authRouter;
