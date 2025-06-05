import {
    addFavouriteDoctorRepo,
    removeFavouriteDoctorRepo,
    getFavouriteDoctorsByUserRepo,
    isDoctorFavouritedRepo
} from '../dataAccessRepo/favouriteDoctors';

export const addFavouriteDoctorsService = async (userId: string, doctorId: string) => {
    const exists = await isDoctorFavouritedRepo(userId, doctorId);
    if (exists) return exists;

    return await addFavouriteDoctorRepo(userId, doctorId);
};

export const removeFavouriteDoctorsService = async (userId: string, doctorId: string) => {
    return await removeFavouriteDoctorRepo(userId, doctorId);
};

export const getFavouriteDoctorsService = async (userId: string) => {
    return await getFavouriteDoctorsByUserRepo(userId);
};
