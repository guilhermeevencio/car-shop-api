import { Router, Request, Response } from 'express';
import CarsController from '../controllers/carsController';
import Cars from '../models/Cars';
import CarsService from '../services/Cars';

const route = Router();

const carsModel = new Cars();
const carsService = new CarsService(carsModel);
const carsController = new CarsController(carsService);

route.post('/cars', (req: Request, res: Response) => (
  carsController.create(req, res)
));

route.get('/cars', (req: Request, res: Response) => (
  carsController.read(req, res)
));

route.get('/cars/:id', (req: Request, res: Response) => (
  carsController.readOne(req, res)
));

export default route;