import * as sinon from 'sinon';
import chai from 'chai';
import Cars from '../../../models/Cars';
import CarsService from '../../../services/Cars';
import { Model } from 'mongoose';
import { carMock, carMockWithId } from '../mocks/carMocks';
import { ZodError } from 'zod';
const { expect } = chai;

describe('Create Car', () => {
  const carModel = new Cars();
  const carsService = new CarsService(carModel);

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  it('Sucess', async () => {
    const carCreated = await carsService.create(carMock);
    expect(carCreated).to.be.deep.equal(carMockWithId);
  });

  // it('Failure', async () => {
  //   let error;

  //   try {
  //     await carsService.create()
  //   } catch (e) {
  //     error = e
  //   }

  //   expect(error).to.be.instanceOf(ZodError)
  // })

});