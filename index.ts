import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import activityRoutes from './routes/activityRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI || 'mongodb://localhost:27017/mern';
mongoose.connect(uri)
  .then(() => console.log('MongoDB connection established successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use('/activities', activityRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
