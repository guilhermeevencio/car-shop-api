import * as sinon from 'sinon';
import chai from 'chai';
import { ICar } from '../../../interfaces/ICar';
import { Model } from 'mongoose';
import Cars from '../../../models/Cars';
const { expect } = chai;

const carMock: ICar = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
}

const carMockWithId :ICar & { _id:string } = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
  _id: "4edd40c86762e0fb12000003",

}

describe('Car Model', () => {
  const carModel = new Cars();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
  });

  after(()=>{
    sinon.restore();
  })

  it('Criando um carro', async () => {
    const newCar = await carModel.create(carMock);
    expect(newCar).to.be.deep.equal(carMockWithId);
  });

  it('Buscando carros', async () => {
    const results = await carModel.read();
    expect(results).to.deep.equal([carMockWithId])
  });

});