import { Request, Response } from 'express';
import CustomError from '../errors/customError';
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

  public async readOne(
    req: Request,
    res: Response<ICar>,
  ) {
    const { id } = req.params;
    const result = await this._service.readOne(id);
    return res.status(200).json(result);
  }

  public async update(
    req: Request,
    res: Response<ICar>,
  ) {
    const { id } = req.params;
    if (!req.body) throw new CustomError('send new car info', 400);
    const result = await this._service.update(id, req.body);
    return res.status(200).json(result as ICar);
  }

  public async delete(
    req: Request,
    res: Response<ICar>,
  ) {
    const { id } = req.params;
    if (!req.body) throw new CustomError('send new car info', 400);
    const result = await this._service.delete(id);
    return res.status(204).json(result as ICar);
  }
}