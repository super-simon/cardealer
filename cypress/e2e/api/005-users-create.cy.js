import '../../commands/login.command.cy';
import '../../commands/user.command.cy';

describe('Users', () => {
  it('201 Login as a Super Admin', function () {
    cy.signIn('admin@admin.admin', '123qwe!@#QWE', 201);
  });

  if (Cypress.env('createSpecificItems')) {
    it('201 Create a manager', function () {
      cy.createUser(
        'Oleksandr Manager',
        'manager@gmail.com',
        '123qwe!@#QWE',
        'MANAGER',
        201,
      );
    });
  }

  it('400 Create a manager without a name', function () {
    cy.createUser('', 'managerr@gmail.com', '123qwe!@#QWE', 'MANAGER', 400);
  });

  it('409 Create a manager with the same email', function () {
    cy.createUser(
      'Oleksandr Manager',
      'manager@gmail.com',
      '123qwe!@#QWE',
      'MANAGER',
      409,
    );
  });

  it('201 Login as a Manager', function () {
    cy.signIn('manager@gmail.com', '123qwe!@#QWE', 201);
  });

  it('403 Create a manager as a manager', function () {
    cy.createUser(
      'Another Manager',
      'manager2@gmail.com',
      '123qwe!@#QWE',
      'MANAGER',
      403,
    );
  });

  it('403 Create an admin as a manager', function () {
    cy.createUser(
      'Another Admin',
      'admin@gmail.com',
      '123qwe!@#QWE',
      'ADMIN',
      403,
    );
  });

  it('201 Login as a client', function () {
    cy.signIn('client@gmail.com', '123qwe!@#QWE', 201);
  });

  it('403 Create an admin as a clent', function () {
    cy.createUser(
      'Another Admin',
      'admin2@gmail.com',
      '123qwe!@#QWE',
      'ADMIN',
      403,
    );
  });

  it('201 Login as a seller', function () {
    cy.signIn('seller@gmail.com', '123qwe!@#QWE', 201);
  });

  it('403 Create an admin as a seller', function () {
    cy.createUser(
      'Yet Another Admin',
      'admin3@gmail.com',
      '123qwe!@#QWE',
      'ADMIN',
      403,
    );
  });
});
