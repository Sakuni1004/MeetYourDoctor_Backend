import { Express } from "express-serve-static-core";
import doctorRouter from "./doctorRoute";
import authRoute from "./authRoute";


export const routes = (app: any) => {
    app.use("/doctor", doctorRouter);
    app.use("/auth", authRoute);

};
