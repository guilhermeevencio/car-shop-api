import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/ErrorHandler';
import route from './routes/cars.routes';

const app = express();

app.use(express.json());
app.use(route);
app.use(errorHandler);

export default app;
