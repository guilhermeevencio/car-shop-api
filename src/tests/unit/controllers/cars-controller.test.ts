import * as sinon from 'sinon';
import chai from 'chai';
import Cars from '../../../models/Cars';
import CarsService from '../../../services/Cars';
import CarsController from '../../../controllers/carsController';
import { NextFunction, Request, Response } from 'express';
import { carMock, carMockWithId } from '../mocks/carMocks';
import { ICar } from '../../../interfaces/ICar';
const { expect } = chai;

describe('Car Controller', () => {
  const carModel = new Cars();
  const carsService = new CarsService(carModel);
  const carController = new CarsController(carsService);

  const req = {} as Request;
  const res = {} as Response;
  const next = {} as NextFunction;

  before(async () => {
    sinon.stub(carsService, 'create').resolves(carMockWithId);
    sinon.stub(carsService, 'read').resolves([carMockWithId]);
    sinon.stub(carsService, 'readOne').resolves(carMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  it('Criando um carro', async () => {
    await carController.create(req, res);

    expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
  });

  it('Busca todos os carros', async () => {
    await carController.read(req, res);

    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith([carMockWithId])).to.be.true;
  })

  it('Busca um carro pelo Id', async () => {
    req.params = { id: carMockWithId._id };
    await carController.readOne(req, res);

    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
  })

});
