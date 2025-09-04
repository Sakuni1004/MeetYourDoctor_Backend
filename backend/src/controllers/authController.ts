import { Request, Response } from 'express';
import {signupUserService, loginUserService, refreshTokenService, updateUserService} from '../services/authService';

export const signup = async (req: Request, res: Response) => {
    try {
        const user = await signupUserService(req.body);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { user, accessToken, refreshToken } = await loginUserService(email, password);

        res.status(200).json({
            message: 'Login successful',
            user,
            accessToken,
            refreshToken,
        });
    } catch (err: any) {
        res.status(401).json({ error: err.message });
    }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(400).json({ error: 'Refresh token is required' });

        const accessToken = await refreshTokenService(refreshToken);
        res.status(200).json({ accessToken });
    } catch (err: any) {
        res.status(403).json({ error: err.message });
    }
};

export const updateUserByIdController = async (req: Request, res: Response) => {
    try {
        const updatedUser = await updateUserService(req.params.id, req.body);
        res.json(updatedUser);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};
