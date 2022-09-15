import { z } from 'zod';
import vehicleZodSchema from './IVehicle';

const motorcycleZodSchema = z.intersection(vehicleZodSchema, z.object({
  category: z.union([z.literal('Street'), z.literal('Custom'), z.literal('Trail')]),
  engineCapacity: z.number().int().min(1).max(2500),
}));

export type IMotorcycle = z.infer<typeof motorcycleZodSchema>;

export default motorcycleZodSchema;