import { Router, Request, Response } from 'express';
import MotorcyclesController from '../controllers/motorcyclesController';
import Motorcycles from '../models/Motorcycles';
import MotorcyclesService from '../services/Motorcycles';

const motorcyclesRoute = Router();

const motorcyclesModel = new Motorcycles();
const motorcyclesService = new MotorcyclesService(motorcyclesModel);
const motorcyclesController = new MotorcyclesController(motorcyclesService);

motorcyclesRoute.post('/motorcycles', (req: Request, res: Response) => (
  motorcyclesController.create(req, res)
));

motorcyclesRoute.get('/motorcycles', (req: Request, res: Response) => (
  motorcyclesController.read(req, res)
));

motorcyclesRoute.get('/motorcycles/:id', (req: Request, res: Response) => (
  motorcyclesController.readOne(req, res)
));

motorcyclesRoute.put('/motorcycles/:id', (req: Request, res: Response) => (
  motorcyclesController.update(req, res)
));

motorcyclesRoute.delete('/motorcycles/:id', (req: Request, res: Response) => (
  motorcyclesController.delete(req, res)
));

export default motorcyclesRoute;