import { Request, Response } from 'express';
import { signupService } from '../services/userService';

export const signupController = async (req: Request, res: Response) => {
    try {
        const user = await signupService(req.body);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};
