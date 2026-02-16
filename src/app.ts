import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import cardsRoutes from './routes/cards';
import fakeUser from './middlewares/fakeUser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fakeUser);
app.use('/users', userRoutes);
app.use('/cards', cardsRoutes);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(3000);
