import { Express } from "express-serve-static-core";
import doctorRouter from "./doctorRoute";
import authRoute from "./authRoute";
import userRoute from "./userRoute";
import favouriteDoctors from "../models/favouriteDoctors";
import favouriteDoctorsRouter from "./favouriteDoctorsRouter";


export const routes = (app: any) => {
    app.use("/doctor", doctorRouter);
    app.use("/auth", authRoute);
    app.use("/user", userRoute);
    app.use("/favourites",favouriteDoctorsRouter);

};
