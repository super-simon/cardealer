import '../../commands/brand.command.cy';
import '../../commands/login.command.cy';
import '../../commands/model.command.cy';

describe('Brands', () => {
  before(() => {
    cy.signIn('seller@gmail.com', '123qwe!@#QWE', 201, 'SELLER');
    cy.signIn('manager@gmail.com', '123qwe!@#QWE', 201, 'MANAGER');
    cy.signIn('admin@admin.admin', '123qwe!@#QWE', 201, 'ADMIN');
    cy.signIn('client@gmail.com', '123qwe!@#QWE', 201, 'CLIENT');
  });

  it('403 Create a brand as a clent', function () {
    cy.createBrand('Ford', 403, 'CLIENT');
  });

  it('403 Create a brand as a seller', function () {
    cy.createBrand('Ford', 403, 'SELLER');
  });

  it('409 Create a brand with existing title as an admin', function () {
    cy.createBrand('Ford', 409, 'ADMIN');
  });

  it('201 Create a brand as a manager', function () {
    cy.createBrand('Infiniti', 201, 'MANAGER');
  });

  it('200 Update brand by name as a manager', function () {
    cy.updateBrandByName('Infiniti', 'Infiniti2', 200, 'MANAGER');
  });

  it('200 Update brand by Id as a manager', function () {
    cy.updateBrandById(Cypress.env('lastBrandId'), 'Infiniti', 200, 'MANAGER');
  });

  it('404 get brand by wrong Id as anonimus', function () {
    cy.request({
      method: 'GET',
      url:
        Cypress.env('baseUrl') + `/brands/e57bbb32-4502-4bf6-97fb-2b2b9d8236d4`,
      failOnStatusCode: false,
    })
      .its('status')
      .should('eq', 404);
  });

  it('200 get brand by Id as anonimus', function () {
    cy.request({
      method: 'GET',
      url: Cypress.env('baseUrl') + `/brands/${Cypress.env('lastBrandId')}`,
    })
      .its('status')
      .should('eq', 200);
  });

  it('200 get brand by name as anonimus', function () {
    cy.request({
      method: 'GET',
      url: Cypress.env('baseUrl') + `/brands/by-name/Infiniti`,
    })
      .its('status')
      .should('eq', 200);
  });

  it('409 Create a brand with existing title as an manager', function () {
    cy.createBrand('Infiniti', 409, 'MANAGER');
  });

  it('201 Create a model as a client', function () {
    cy.createModel('qx60', Cypress.env('lastBrandId'), 403, 'CLIENT');
  });

  it('201 Create a model as a manager', function () {
    cy.createModel('qx60', Cypress.env('lastBrandId'), 201, 'MANAGER');
  });

  it('409 Create a duplicate model as a manager', function () {
    cy.createModel('qx60', Cypress.env('lastBrandId'), 409, 'MANAGER');
  });

  it('404 Update model by wrong Id as a manager', function () {
    cy.updateModel(
      'e57bbb32-4502-4bf6-97fb-2b2b9d8236d4',
      'qx50',
      404,
      'MANAGER',
    );
  });

  it('403 Update model by Id as a client', function () {
    cy.updateModel(Cypress.env('lastModelId'), 'qx50', 403, 'CLIENT');
  });

  it('200 Update model by Id as a manager', function () {
    cy.updateModel(Cypress.env('lastModelId'), 'qx50', 200, 'MANAGER');
  });

  it('404 get model by wrong id as anonimus', function () {
    cy.request({
      method: 'GET',
      url:
        Cypress.env('baseUrl') + `/models/e57bbb32-4502-4bf6-97fb-2b2b9d8236d4`,
      failOnStatusCode: false,
    })
      .its('status')
      .should('eq', 404);
  });

  it('200 get model by id as anonimus', function () {
    cy.request({
      method: 'GET',
      url: Cypress.env('baseUrl') + `/models/${Cypress.env('lastModelId')}`,
    })
      .its('status')
      .should('eq', 200);
  });

  it('201 Delete a model as seller', function () {
    cy.deleteModel(Cypress.env('lastModelId'), 403, 'SELLER');
  });

  it('404 Delete a model by wrong id as a manager', function () {
    cy.deleteModel('e57bbb32-4502-4bf6-97fb-2b2b9d8236d4', 404, 'MANAGER');
  });

  it('201 Delete a model as a manager', function () {
    cy.deleteModel(Cypress.env('lastModelId'), 200, 'MANAGER');
  });

  it('200 Delete brand by Id as an manager', function () {
    cy.deleteBrandById(Cypress.env('lastBrandId'), 200, 'MANAGER');
  });
});
