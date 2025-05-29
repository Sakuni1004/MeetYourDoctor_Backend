import User, {IUser} from "../models/user";
import bcrypt from "bcryptjs";
import {updateUserById} from "../dataAccessRepo/userRepo";

export const updateUserService = async (id: string, updateData: Partial<IUser>): Promise<IUser | null> => {
    const existingUser = await User.findById(id);
    if (!existingUser) {
        throw new Error('User not found');
    }

    if (updateData.email && updateData.email !== existingUser.email) {
        const emailTaken = await User.findOne({ email: updateData.email });
        if (emailTaken) {
            throw new Error('Email is already in use');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(updateData.email)) {
            throw new Error('Invalid email format');
        }
    }

    if (updateData.password) {
        if (updateData.password.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }
        const saltRounds = 10;
        updateData.password = await bcrypt.hash(updateData.password, saltRounds);
    }

    if (updateData.fullName) {
        updateData.fullName = updateData.fullName.trim();
        if (updateData.fullName.length < 2) {
            throw new Error('Full name must be at least 2 characters');
        }
    }

    if (updateData.mobileNumber) {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(updateData.mobileNumber)) {
            throw new Error('Invalid mobile number format');
        }
    }

    return updateUserById(id, updateData);
};

