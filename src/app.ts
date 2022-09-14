import express from 'express';
import errorHandler from './middlewares/ErrorHandler';
import route from './routes/cars.routes';
import 'express-async-errors';

const app = express();

app.use(express.json());
app.use(route);
app.use(errorHandler);

export default app;
