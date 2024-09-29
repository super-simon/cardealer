import '../../commands/brand.command.cy';
import '../../commands/login.command.cy';

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

  it('201 Create a brand with existing title as an manager', function () {
    cy.createBrand('Infiniti', 201, 'MANAGER');
  });

  it('200 Update brand by name as an manager', function () {
    cy.updateBrandByName('Infiniti', 'Infiniti2', 200, 'MANAGER');
  });

  it('200 Update brand by Id as an manager', function () {
    cy.updateBrandById(Cypress.env('lastBrandId'), 'Infiniti', 200, 'MANAGER');
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

  it('200 Delete brand by Id as an manager', function () {
    cy.deleteBrandById(Cypress.env('lastBrandId'), 200, 'MANAGER');
  });
});
