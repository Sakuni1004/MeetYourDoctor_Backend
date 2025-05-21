import User, { IUser } from '../models/user';

export const createUser = async (userData: IUser) => {
    const user = new User(userData);
    return await user.save();
};

export const findUserByEmail = async (email: string) => {
    return await User.findOne({ email });
};
