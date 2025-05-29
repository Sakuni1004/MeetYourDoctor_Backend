import User, {IUser} from "../models/user";

export const updateUserById = async (id: string, updateData: Partial<IUser>): Promise<IUser | null> => {
    return User.findByIdAndUpdate(id, updateData, { new: true });
};
