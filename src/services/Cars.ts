import { IService } from '../interfaces/IService';
import carZodSchema, { ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';

export default class CarsService implements IService<ICar> {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: ICar): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    return this._car.create(obj);
  }

  public async readOne(_id: string): Promise<ICar> {
    const car = await this._car.readOne(_id);
    if (!car) throw new Error('Entity not found');
    return car;
  }

  public async read(): Promise<ICar[]> {
    const cars = await this._car.read();
    return cars;
  }

  public async update(_id: string, obj: ICar): Promise<ICar | null> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._car.update(_id, obj);
  }

  public async delete(_id: string): Promise<ICar | null> {
    const deletedCar = this._car.delete(_id);
    if (!deletedCar) {
      throw new Error('Deu ruim');
    }
    return deletedCar;
  }
}