import { Router, Request, Response } from 'express';

const route = Router();

route.post('/cars', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World!' });
});

export default route;