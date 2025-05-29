import mongoose from "mongoose";
import { updateUserController} from '../controllers/userController';
import express from "express";

const userRouter = express.Router();


userRouter.put('/update/:id', updateUserController);


export default userRouter;
