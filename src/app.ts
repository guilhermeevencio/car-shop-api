import express from 'express';
import errorHandler from './middlewares/ErrorHandler';
import route from './routes/cars.routes';

const app = express();

app.use(route);
app.use(errorHandler);

export default app;
