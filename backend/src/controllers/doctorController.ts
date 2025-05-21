import {
    createDoctorService,
    deleteDoctorsService,
    getAllDoctorsService,
    updateManyDoctorsService
} from "../services/doctorService";

export const createDoctorController = async(req:any ,res:any)=> {
    try{
        const data = await createDoctorService(req.body);
        res.send(data);

    }
    catch (e){
        return res.status(400).send(e);
    }
};

export const getAllDoctorsController = async (req:any, res:any) => {
    try {
        const { id} = req.query;

        const data = await getAllDoctorsService(id );
        res.send(data);
    } catch (e) {
        return res.status(400).send(e);
    }
};

export const updateDoctorsController = async (req:any, res:any) => {
    try {
        const data = req.body;
        const result = await updateManyDoctorsService(data);
        res.send(result);
    } catch (e) {
        return res.status(400).send(e);
    }
};

export const deleteDoctorsController = async (req:any, res:any) => {
    try {
        const data = req.body;
        const result = await deleteDoctorsService(data);
        res.send(result);
    } catch (e) {
        return res.status(400).send(e);
    }
};

