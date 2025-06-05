import FavouriteDoctors from '../models/favouriteDoctors';

export const addFavouriteDoctorRepo = async (userId: string, doctorId: string) => {
    return FavouriteDoctors.create({ userId, doctorId });
};

export const removeFavouriteDoctorRepo = async (userId: string, doctorId: string) => {
    return FavouriteDoctors.findOneAndDelete({userId, doctorId});
};

export const getFavouriteDoctorsByUserRepo = async (userId: string) => {
    return  FavouriteDoctors.find({ userId }).populate('doctorId');
};

export const isDoctorFavouritedRepo = async (userId: string, doctorId: string) => {
    return  FavouriteDoctors.findOne({ userId, doctorId });
};
