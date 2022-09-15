import { ICar } from "../../../interfaces/ICar"

export const carMock: ICar = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
}

export const carMockWithId :ICar & { _id:string } = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
  _id: "4edd40c86762e0fb12000003",

}