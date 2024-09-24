import '../../commands/brand.command.cy';
import '../../commands/login.command.cy';

describe('Brands', () => {
  it('201 Login as a client', function () {
    cy.signIn('client@gmail.com', '123qwe!@#QWE', 201);
  });

  it('403 Create a brand as a clent', function () {
    cy.createBrand('Ford', 403);
  });

  it('201 Login as a seller', function () {
    cy.signIn('seller@gmail.com', '123qwe!@#QWE', 201);
  });

  it('403 Create a brand as a seller', function () {
    cy.createBrand('Ford', 403);
  });

  it('201 Login as a Super Admin', function () {
    cy.signIn('admin@admin.admin', '123qwe!@#QWE', 201);
  });

  it('409 Create a brand with existing title as an admin', function () {
    cy.createBrand('Ford', 409);
  });

  it('201 Login as a Manager', function () {
    cy.signIn('manager@gmail.com', '123qwe!@#QWE', 201);
  });

  if (Cypress.env('createSpecificItems')) {
    it('201 Create a brand with existing title as an manager', function () {
      cy.createBrand('Infiniti', 201);
    });
  }

  it('200 Update brand by name with existing title as an manager', function () {
    cy.updateBrandByName('Infiniti', 'Infiniti2', 200);
  });

  it('200 Update brand by Id with existing title as an manager', function () {
    cy.updateBrandById(Cypress.env('lastBrandId'), 'Infiniti', 200);
  });
});
