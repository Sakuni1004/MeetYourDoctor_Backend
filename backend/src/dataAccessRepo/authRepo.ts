import User, { IUser } from '../models/user';

export const createUserRepo = async (userData: IUser) => {
    const user = new User(userData);
    return await user.save();
};

export const findUserByEmailRepo = async (email: string) => {
    return await User.findOne({ email });
};
