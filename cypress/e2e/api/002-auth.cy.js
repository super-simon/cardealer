import '../../commands/login.command.cy';

describe('Auth', () => {
  if (Cypress.env('createSpecificItems')) {
    it('201 SignUp as a client', function () {
      cy.signUp(
        'Oleksandr Client',
        'client@gmail.com',
        '123qwe!@#QWE',
        'CLIENT',
        201,
      );
    });
  }

  if (Cypress.env('createSpecificItems')) {
    it('201 SignUp as a seller', function () {
      cy.signUp(
        'Oleksandr Seller',
        'seller@gmail.com',
        '123qwe!@#QWE',
        'SELLER',
        201,
      );
    });
  }

  it('409 SignUp with the same emial', function () {
    cy.signUp(
      'Oleksandr Client',
      'client@gmail.com',
      '123qwe!@#QWE',
      'CLIENT',
      409,
    );
  });

  it('401 SignIn with wrong email', function () {
    cy.signIn('client@gmail.comm', '123qwe!@#QW', 401);
  });

  it('401 SignIn with wrong password', function () {
    cy.signIn('client@gmail.com', '123qwe!@#QW', 401);
  });

  it('201 SignIn', function () {
    cy.signIn('client@gmail.com', '123qwe!@#QWE', 201);
  });

  it('200 Get me', function () {
    const accessToken = Cypress.env('accessToken');
    const authorization = `Bearer ${accessToken}`;
    cy.request({
      method: 'GET',
      url: Cypress.env('baseUrl') + '/users/me',
      headers: {
        authorization,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
