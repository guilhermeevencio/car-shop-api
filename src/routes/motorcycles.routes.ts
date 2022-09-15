import { Router, Request, Response } from 'express';
import MotorcyclesController from '../controllers/motorcyclesController';
import Motorcycles from '../models/Motorcycles';
import MotorcyclesService from '../services/Motorcycles';

const motorcyclesRoute = Router();

const motorcyclesModel = new Motorcycles();
const motorcyclesService = new MotorcyclesService(motorcyclesModel);
const motorcyclesController = new MotorcyclesController(motorcyclesService);

const MOTORCYCLE_BASE_URL = '/motorcycles';

motorcyclesRoute.post(MOTORCYCLE_BASE_URL, (req: Request, res: Response) => (
  motorcyclesController.create(req, res)
));

motorcyclesRoute.get(MOTORCYCLE_BASE_URL, (req: Request, res: Response) => (
  motorcyclesController.read(req, res)
));

motorcyclesRoute.get(`${MOTORCYCLE_BASE_URL}/:id`, (req: Request, res: Response) => (
  motorcyclesController.readOne(req, res)
));

motorcyclesRoute.put(`${MOTORCYCLE_BASE_URL}/:id`, (req: Request, res: Response) => (
  motorcyclesController.update(req, res)
));

motorcyclesRoute.delete(`${MOTORCYCLE_BASE_URL}/:id`, (req: Request, res: Response) => (
  motorcyclesController.delete(req, res)
));

export default motorcyclesRoute;