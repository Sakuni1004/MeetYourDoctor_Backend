import { createUser, findUserByEmail } from '../dataAccessRepo/userRepo';
import { IUser } from '../models/user';
import bcrypt from 'bcryptjs';

export const signupService = async (userData: IUser) => {
    const existing = await findUserByEmail(userData.email);
    if (existing) throw new Error('Email already in use');

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    return await createUser(userData);
};
