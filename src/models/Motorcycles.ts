import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const motorcyclesMongooseSchema = new Schema<IMotorcycle>({
  buyValue: Number,
  color: String,
  model: String,
  status: Boolean,
  year: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

export default class Motorcycles extends MongoModel<IMotorcycle> {
  constructor(model = mongooseCreateModel('Motorcycles', motorcyclesMongooseSchema)) {
    super(model);
  }
}