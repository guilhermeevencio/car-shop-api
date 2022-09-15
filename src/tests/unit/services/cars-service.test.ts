import * as sinon from 'sinon';
import chai from 'chai';
import Cars from '../../../models/Cars';
import CarsService from '../../../services/Cars';
import { Model } from 'mongoose';
import { carMock, carMockWithId } from '../mocks/carMocks';
import { ZodError } from 'zod';
import { ICar } from '../../../interfaces/ICar';
const { expect } = chai;

describe('Car Service', () => {
  const carModel = new Cars();
  const carsService = new CarsService(carModel);

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findById').resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  it('Criando um carro', async () => {
    const carCreated = await carsService.create(carMock);
    expect(carCreated).to.be.deep.equal(carMockWithId);
  });

  it('Buscando todos os carros', async () => {
    const carCreated = await carsService.read();
    expect(carCreated).to.be.deep.equal([carMockWithId]);
  });

  it('Retorna erro caso não sejam passados os dados corretos ao criar um carro.', async () => {
    let error;

    try {
      await carsService.create({} as ICar)
    } catch (e) {
      error = e
    }

    expect(error).to.be.instanceOf(ZodError)
  })

  it('Buscando um carro por Id', async () => {
    const carCreated = await carsService.readOne(carMockWithId._id);
    expect(carCreated).to.be.deep.equal(carMockWithId);
  });

});