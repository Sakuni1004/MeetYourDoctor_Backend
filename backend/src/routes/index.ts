import { Express } from "express-serve-static-core";
import userRouter from "./userRoute";
import doctorRouter from "./doctorRoute";
import authRoute from "./authRoute";


export const routes = (app: any) => {
    app.use("/user", userRouter);
    app.use("/doctor", doctorRouter);
    app.use("/auth", authRoute);

};
