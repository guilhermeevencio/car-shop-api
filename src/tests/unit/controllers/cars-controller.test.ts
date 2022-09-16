import * as sinon from 'sinon';
import chai from 'chai';
import Motorcycles from '../../../models/Motorcycles';
import MotorcyclesService from '../../../services/Motorcycles';
import MotorcyclesController from '../../../controllers/motorcyclesController';
import { NextFunction, Request, Response } from 'express';
import { motorcycleMock, motorcycleMockWithId } from '../mocks/motorCycleMocks';
import { IMotorcycle } from '../../../interfaces/IMotorcycle';
const { expect } = chai;

describe('Motorcycle Controller', () => {
  const motorcyclesModel = new Motorcycles();
  const motorcyclesService = new MotorcyclesService(motorcyclesModel);
  const motorcyclesController = new MotorcyclesController(motorcyclesService);

  const req = {} as Request;
  const res = {} as Response;
  const next = {} as NextFunction;

  before(async () => {
    sinon.stub(motorcyclesService, 'create').resolves(motorcycleMockWithId);
    sinon.stub(motorcyclesService, 'read').resolves([motorcycleMockWithId]);
    sinon.stub(motorcyclesService, 'readOne').resolves(motorcycleMockWithId);
    sinon.stub(motorcyclesService, 'update').resolves(motorcycleMockWithId);
    sinon.stub(motorcyclesService, 'delete').resolves(motorcycleMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  it('Criando uma moto', async () => {
    await motorcyclesController.create(req, res);

    expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
  });

  it('Busca todas as motos', async () => {
    await motorcyclesController.read(req, res);

    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith([motorcycleMockWithId])).to.be.true;
  })

  it('Busca uma moto pelo Id', async () => {
    req.params = { id: motorcycleMockWithId._id };
    await motorcyclesController.readOne(req, res);

    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
  })

  it('Atualizando uma moto', async () => {
    req.params = { id: motorcycleMockWithId._id };
    req.body = motorcycleMock
    await motorcyclesController.update(req, res);

    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
  })

  it('Removendo uma moto', async () => {
    req.params = { id: motorcycleMockWithId._id };
    await motorcyclesController.delete(req, res);

    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
  })

});
