import { Request, Response } from 'express';
import { registerUser } from '../services/userService';

export const register = async (req: Request, res: Response) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};
