import app from './app';
import cors from 'cors';
import connectDB from './config/db';

const PORT = process.env.PORT || 5000;
app.use(cors());

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
