import {Request, Response} from "express";
import {updateUserService} from "../services/userService";

export const updateUserController = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const updatedUser = await updateUserService(userId, req.body);

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};
