import { Request, Response } from 'express';
import {
    addFavouriteDoctorsService,
    removeFavouriteDoctorsService,
    getFavouriteDoctorsService
} from '../services/favouriteDoctorsService';

export const addFavouriteDoctorsController = async (req: Request, res: Response) => {
    try {
        const  userId  = req.params.id;
        const { doctorId } = req.body;

        // console.log("fav------", userId);

        const favourite = await addFavouriteDoctorsService(userId, doctorId);
        console.log("fav------", favourite);
        res.status(200).json({ message: 'Doctor added to favourites', favourite });
    } catch (err: any) {
        res.status(400).json({ message: 'Failed to add favourite doctor', error: err.message });
    }
};

export const removeFavouriteDoctorsController = async (req: Request, res: Response) => {
    try {
        const { userId, doctorId } = req.params;
        // console.log("fav/////------", userId);


        await removeFavouriteDoctorsService(userId, doctorId);
        res.status(200).json({ message: 'Doctor removed from favourites' });
    } catch (err: any) {
        res.status(500).json({ message: 'Failed to remove favourite doctor', error: err.message });
    }
};

export const getFavouriteDoctorsController = async (req: Request, res: Response) => {
    try {
        const userId  = req.params.id;

        const favourites = await getFavouriteDoctorsService(userId);
        res.status(200).json({ favourites });
    } catch (err: any) {
        res.status(500).json({ message: 'Failed to fetch favourite doctors', error: err.message });
    }
};
