import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

export default class CarsController {
  constructor(private _service: IService<ICar>) {}

  public async create(
    req: Request,
    res: Response<ICar>,
  ) {  
    const results = await this._service.create(req.body);
    return res.status(201).json(results);
  }

  public async read(
    _req: Request,
    res: Response<ICar[]>,
  ) {
    const results = await this._service.read();
    return res.status(200).json(results);
  }
}