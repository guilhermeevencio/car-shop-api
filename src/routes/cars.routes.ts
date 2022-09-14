import { Router, Request, Response, NextFunction } from 'express';
import CarsController from '../controllers/carsController';
import Cars from '../models/Cars';
import CarsService from '../services/Cars';

const route = Router();

const carsModel = new Cars();
const carsService = new CarsService(carsModel);
const carsController = new CarsController(carsService);

route.post('/cars', (req: Request, res: Response, next: NextFunction) => (
  carsController.create(req, res, next)
));

route.get('/cars', (req: Request, res: Response, next: NextFunction) => (
  carsController.read(req, res, next)
));

export default route;