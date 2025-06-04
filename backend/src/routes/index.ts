import { Express } from "express-serve-static-core";
import doctorRouter from "./doctorRoute";
import authRoute from "./authRoute";
import userRoute from "./userRoute";
import appointmentRouter from "./appointmentRoute";


export const routes = (app: any) => {
    app.use("/doctor", doctorRouter);
    app.use("/auth", authRoute);
    app.use("/user", userRoute);
    app.use("/appointment", appointmentRouter);

};
