import express from "express";
import connectDB from './config/db';
import {routes} from "./routes";

const PORT = process.env.PORT || 5000;
const app = express();

routes(app);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
