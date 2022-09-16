import * as sinon from 'sinon';
import chai from 'chai';
import Cars from '../../../models/Cars';
import CarsService from '../../../services/Cars';
import CarsController from '../../../controllers/carsController';
import { NextFunction, Request, Response } from 'express';
import { carMock, carMockWithId } from '../mocks/carMocks';
const { expect } = chai;

describe('Car Controller', () => {
  const carsModel = new Cars();
  const carsService = new CarsService(carsModel);
  const carsController = new CarsController(carsService);

  const req = {} as Request;
  const res = {} as Response;
  const next = {} as NextFunction;

  before(async () => {
    sinon.stub(carsService, 'create').resolves(carMockWithId);
    sinon.stub(carsService, 'read').resolves([carMockWithId]);
    sinon.stub(carsService, 'readOne').resolves(carMockWithId);
    sinon.stub(carsService, 'update').resolves(carMockWithId);
    sinon.stub(carsService, 'delete').resolves(carMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  it('Criando um carro', async () => {
    await carsController.create(req, res);

    expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
  });

  it('Busca todos os carros', async () => {
    await carsController.read(req, res);

    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith([carMockWithId])).to.be.true;
  })

  it('Busca um carro pelo Id', async () => {
    req.params = { id: carMockWithId._id };
    await carsController.readOne(req, res);

    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
  })

  it('Atualizando um carro', async () => {
    req.params = { id: carMockWithId._id };
    req.body = carMock
    await carsController.update(req, res);

    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
  })

  it('Removendo um carro', async () => {
    req.params = { id: carMockWithId._id };
    await carsController.delete(req, res);

    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
  })

});
