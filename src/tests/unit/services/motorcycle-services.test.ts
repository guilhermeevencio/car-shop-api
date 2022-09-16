import * as sinon from 'sinon';
import chai from 'chai';
import Motorcycles from '../../../models/Motorcycles';
import MotorcycleService from '../../../services/Motorcycles';
import { Model } from 'mongoose';
import { motorcycleMock, motorcycleMockWithId } from '../mocks/motorCycleMocks';
import { ZodError } from 'zod';
import { IMotorcycle } from '../../../interfaces/IMotorcycle';
import CustomError from '../../../errors/customError';
const { expect } = chai;

describe('Motorcycle Service', () => {
  const motorcycleModel = new Motorcycles();
  const motorcyclesService = new MotorcycleService(motorcycleModel);

  beforeEach(() => {
    sinon.stub(motorcycleModel, 'create').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleModel, 'read').resolves([motorcycleMockWithId]);
    sinon.stub(motorcycleModel, 'readOne').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleModel, 'update').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleModel, 'delete').resolves(null);
  });

  afterEach(()=>{
    sinon.restore();
  })

  it('Criando uma moto', async () => {
    const motorcycleCreated = await motorcyclesService.create(motorcycleMock);
    expect(motorcycleCreated).to.be.deep.equal(motorcycleMockWithId);
  });

  it('Buscando todas as motos', async () => {
    const motorcycleCreated = await motorcyclesService.read();
    expect(motorcycleCreated).to.be.deep.equal([motorcycleMockWithId]);
  });

  it('Retorna erro caso não sejam passados os dados corretos ao criar uma moto.', async () => {
    let error;

    try {
      await motorcyclesService.create({} as IMotorcycle)
    } catch (e) {
      error = e
    }
    
    expect(error).to.be.instanceOf(ZodError)
  })

  it('Retorna erro caso não sejam passados os dados corretos ao editar um carro.', async () => {
    let error;

    try {
      await motorcyclesService.update(motorcycleMockWithId._id, {} as IMotorcycle)
    } catch (e) {
      error = e
      expect(error).to.be.instanceOf(ZodError)
    }

  })

  it('Retorna erro caso não sejam passados um id inválido ao editar um carro.', async () => {
    let error;
    try {
      await motorcyclesService.update('WrongId', motorcycleMock)
    } catch (e) {
      error = e
      expect(error).to.be.instanceOf(CustomError)
    }   
  })

  it('Retorna erro caso não sejam passados o id correto ao editar uma moto.', async () => {
    let error;
    sinon.restore();
    sinon.stub(motorcycleModel, 'readOne').resolves(null);

    try {
      await motorcyclesService.update('WrongId', motorcycleMock)
    } catch (e) {
      error = e
    }
    
    expect(error).to.be.instanceOf(CustomError)
  })

  it('Buscando uma moto por Id', async () => {
    const motorcycleCreated = await motorcyclesService.readOne(motorcycleMockWithId._id);
    expect(motorcycleCreated).to.be.deep.equal(motorcycleMockWithId);
  });

  it('Atualizando uma moto', async () => {
    const motorcycleCreated = await motorcyclesService.update(motorcycleMockWithId._id, motorcycleMock);
    expect(motorcycleCreated).to.be.deep.equal(motorcycleMockWithId);
  });

  it('Removendo uma moto', async () => {
    const motorcycleCreated = await motorcyclesService.delete(motorcycleMockWithId._id);
    expect(motorcycleCreated).to.be.null;
  });

});