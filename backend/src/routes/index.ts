import { Express } from "express-serve-static-core";
import userRouter from "./userRoute";
import doctorRouter from "./doctorRoute";


export const routes = (app: any) => {
    app.use("/user", userRouter);
    app.use("/doctor", doctorRouter);

};
