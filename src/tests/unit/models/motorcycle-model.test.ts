import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import Motorcycles from '../../../models/Motorcycles';
import { motorcycleMock, motorcycleMockWithId } from '../mocks/motorCycleMocks';
const { expect } = chai;

describe('Motorcycle Model', () => {
  const motorcycleModel = new Motorcycles();

  before(async () => {
    sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'find').resolves([motorcycleMockWithId]);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'findById').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'findOneAndDelete').resolves(null);
  });

  after(()=>{
    sinon.restore();
  })

  it('Criando uma moto', async () => {
    const newMotorcycle = await motorcycleModel.create(motorcycleMock);
    expect(newMotorcycle).to.be.deep.equal(motorcycleMockWithId);
  });

  it('Buscando todas as motos', async () => {
    const results = await motorcycleModel.read();
    expect(results).to.deep.equal([motorcycleMockWithId])
  });

  it('Atualizando informações da moto', async () => {
    const updatedMotorcycle = await motorcycleModel.update(motorcycleMockWithId._id, motorcycleMock);
    expect(updatedMotorcycle).to.deep.equal(motorcycleMockWithId)
  });

  it('Buscando uma moto por id', async () => {
    const motorcycle = await motorcycleModel.readOne(motorcycleMockWithId._id);
    expect(motorcycle).to.deep.equal(motorcycleMockWithId)
  });

  it('Removendo uma moto', async () => {
    const motorcycle = await motorcycleModel.delete(motorcycleMockWithId._id);
    expect(motorcycle).to.be.null
  });

});