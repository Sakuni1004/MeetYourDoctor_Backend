import { IUser } from '../models/user';
import { createUser, findUserByEmail } from '../dataAccessRepo/userRepo';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signupUserService = async (userData: IUser) => {
    const existing = await findUserByEmail(userData.email);
    if (existing) throw new Error('Email already in use');

    userData.password = await bcrypt.hash(userData.password, 10);
    return await createUser(userData);
};

export const loginUserService = async (email: string, password: string) => {
    const user = await findUserByEmail(email);
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

