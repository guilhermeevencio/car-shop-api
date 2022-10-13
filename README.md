
# Car Shop API

This application is a car store management api, where it is possible to register new vehicles, edit, remove and search for all registered vehicles.

* The application was developed following the principles of __SOLID__ and __TDD__ (Test-Driven Development).
* MongoDB was used as a database.
* The Back-End was developed using Node.js with Typescript.
* The unit tests were developed using Jest, Mocha, Chai and Sinon.
* For data validation, the ZOD library was used.
* Mongoose was used to integrate Node.js with MongoDB.
* Eslint was used to standardize code writing.

## To run the code, follow the commands below


1. `npm install`
2. `docker compose up -d`
3. `docker exec -it car_shop bash`
4. `npm run dev`


## To run the tests, run the commands below
1. `npm run test:dev`
2. `npm run test:coverage`
