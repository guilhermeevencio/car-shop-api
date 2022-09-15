import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import Cars from '../../../models/Cars';
import { carMock, carMockWithId } from '../mocks/carMocks';
const { expect } = chai;

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