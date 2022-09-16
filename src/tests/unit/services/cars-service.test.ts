import * as sinon from 'sinon';
import chai from 'chai';
import Cars from '../../../models/Cars';
import CarsService from '../../../services/Cars';
import { Model } from 'mongoose';
import { carMock, carMockWithId } from '../mocks/carMocks';
import { ZodError } from 'zod';
import { ICar } from '../../../interfaces/ICar';
import CustomError from '../../../errors/customError';
const { expect } = chai;

describe('Car Service', async () => {
  const carModel = new Cars();
  const carsService = new CarsService(carModel);

  beforeEach(() => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves([carMockWithId]);
    sinon.stub(carModel, 'readOne').resolves(carMockWithId);
    sinon.stub(carModel, 'update').resolves(carMockWithId);
    sinon.stub(carModel, 'delete').resolves(null);
  });

  afterEach(()=>{
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
      await carsService.create({} as any)
    } catch (e) {
      error = e
      expect(error).to.be.instanceOf(ZodError)
    }

  })

  it('Retorna erro caso não sejam passados os dados corretos ao editar um carro.', async () => {
    let error;

    try {
      await carsService.update(carMockWithId._id, {} as ICar)
    } catch (e) {
      error = e
      expect(error).to.be.instanceOf(ZodError)
    }

  })

  it('Retorna erro caso não sejam passados um id inválido ao editar um carro.', async () => {
    sinon.restore();
    let error;
    try {
      await carsService.readOne('WrongId')
    } catch (e) {
      error = e
      console.log(e);
      
      expect(error).to.be.instanceOf(CustomError)
    }   
  })

  it('Retorna erro caso não sejam passados o id correto ao editar um carro.', async () => {
    let error;
    sinon.restore();
    sinon.stub(carModel, 'readOne').resolves(null);
    try {
      await carsService.update('WrongId', carMock)
    } catch (e) {
      error = e
      expect(error).to.be.instanceOf(CustomError)
    }   
  })

  it('Buscando um carro por Id', async () => {
    const carCreated = await carsService.readOne(carMockWithId._id);
    expect(carCreated).to.be.deep.equal(carMockWithId);
  });

  it('Atualizando um carro', async () => {
    const carCreated = await carsService.update(carMockWithId._id, carMock);
    expect(carCreated).to.be.deep.equal(carMockWithId);
  });

  it('Removendo um carro', async () => {
    const carCreated = await carsService.delete(carMockWithId._id);
    expect(carCreated).to.be.null;
  });

});