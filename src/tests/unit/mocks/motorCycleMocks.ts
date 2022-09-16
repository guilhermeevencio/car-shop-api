import { IMotorcycle } from '../../../interfaces/IMotorcycle';

export const motorcycleMock: IMotorcycle = {
	model: "Honda CG Titan 126",
  year: 1963,
  color: "black",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
}

export const motorcycleMockWithId: IMotorcycle & { _id: string } = {
  _id: "63237c688dd5bd9c3c623d1c",
	model: "Honda CG Titan 126",
  year: 1963,
  color: "black",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
}