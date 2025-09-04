import { IUser } from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {createUserRepo, findUserByEmailRepo, findUserByIdRepo, updateUserById} from "../dataAccessRepo/authRepo";

export const signupUserService = async (userData: IUser) => {
    const existing = await findUserByEmailRepo(userData.email);
    if (existing) throw new Error('Email already in use');

    userData.password = await bcrypt.hash(userData.password, 10);
    return await createUserRepo(userData);
};

export const loginUserService = async (email: string, password: string) => {
    const user = await findUserByEmailRepo(email);
    if (!user) throw new Error('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid credentials');

    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: '15m',
    });

    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET!,{
        expiresIn:'7d',
    });

    return { user, accessToken, refreshToken };
};

export const refreshTokenService = async (refreshToken: string) => {
    try {
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as { userId: string };

        const user = await findUserByIdRepo(payload.userId);
        if (!user) throw new Error('User not found');

        const newAccessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET!, {
            expiresIn: '15m',
        });

        return newAccessToken;
    } catch (err) {
        throw new Error('Invalid or expired refresh token');
    }
};

export const updateUserService = async (id: string, data: any) => {
    const updatedUser = await updateUserById(id, data);
    if (!updatedUser) throw new Error('Update failed');
    return updatedUser;
};
