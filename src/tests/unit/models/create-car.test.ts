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
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockWithId);
    sinon.stub(Model, 'findById').resolves(carMockWithId);
    sinon.stub(Model, 'findOneAndRemove').resolves(null);
  });

  after(()=>{
    sinon.restore();
  })

  it('Criando um carro', async () => {
    const newCar = await carModel.create(carMock);
    expect(newCar).to.be.deep.equal(carMockWithId);
  });

  it('Buscando todos os carros', async () => {
    const results = await carModel.read();
    expect(results).to.deep.equal([carMockWithId])
  });

  it('Atualizando informações do carro', async () => {
    const updatedCar = await carModel.update(carMockWithId._id, carMock);
    expect(updatedCar).to.deep.equal(carMockWithId)
  });

  it('Buscando carro por id', async () => {
    const car = await carModel.readOne(carMockWithId._id);
    expect(car).to.deep.equal(carMockWithId)
  });

  // it('Removendo um carro', async () => {
  //   const car = await carModel.delete(carMockWithId._id);
  //   expect(car).to.be.null
  // });

});