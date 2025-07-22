import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from './config/env';

import authRoutes from './routes/auth.routes';
import adRoutes from './routes/ad.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/ads', adRoutes);

mongoose.connect(config.MONGO_URL as string)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));
    })
    .catch((error) => console.error('Error connecting to MongoDB:', error));
