import 'express-async-errors';
import express from 'express';
import errorHandler from './middlewares/ErrorHandler';
import route from './routes/cars.routes';
import motorcyclesRoute from './routes/motorcycles.routes';

const app = express();

app.use(express.json());
app.use(route);
app.use(motorcyclesRoute);
app.use(errorHandler);

export default app;
