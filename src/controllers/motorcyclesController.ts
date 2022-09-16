import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

export default class MotorcyclesController {
  constructor(private _service: IService<IMotorcycle>) {}

  public async create(
    req: Request,
    res: Response<IMotorcycle>,
  ) {  
    const results = await this._service.create(req.body);
    return res.status(201).json(results);
  }

  public async read(
    _req: Request,
    res: Response<IMotorcycle[]>,
  ) {
    const results = await this._service.read();
    return res.status(200).json(results);
  }

  public async readOne(
    req: Request,
    res: Response<IMotorcycle>,
  ) {
    const { id } = req.params;
    const result = await this._service.readOne(id);
    return res.status(200).json(result);
  }

  public async update(
    req: Request,
    res: Response<IMotorcycle>,
  ) {
    const { id } = req.params;
    const result = await this._service.update(id, req.body);
    return res.status(200).json(result as IMotorcycle);
  }

  public async delete(
    req: Request,
    res: Response<IMotorcycle>,
  ) {
    const { id } = req.params;
    const result = await this._service.delete(id);
    return res.status(204).json(result as IMotorcycle);
  }
}