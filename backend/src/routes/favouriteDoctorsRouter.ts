import { Router } from 'express';

import {
    addFavouriteDoctorsController, getFavouriteDoctorsController,
    removeFavouriteDoctorsController
} from "../controllers/favouriteDoctorsController";

export const favouritesDoctorsRouter = Router();


favouritesDoctorsRouter.post('/create/:id',addFavouriteDoctorsController);
favouritesDoctorsRouter.delete('/:userId/:doctorId',removeFavouriteDoctorsController);
favouritesDoctorsRouter.get('/:id',getFavouriteDoctorsController);


export default favouritesDoctorsRouter;
