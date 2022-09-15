import { NextFunction, Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

export default class CarsController {
  constructor(private _service: IService<ICar>) {}

  public async create(
    req: Request,
    res: Response<ICar>,
    next: NextFunction,
  ) {
    try {    
      const results = await this._service.create(req.body);
      return res.status(201).json(results);
    } catch (error) {
      next(error);
    }
  }

  public async read(
    _req: Request,
    res: Response<ICar[]>,
    next: NextFunction,
  ) {
    try {
      const results = await this._service.read();
      return res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  }
}