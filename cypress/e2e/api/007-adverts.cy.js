import '../../commands/advert.command.cy';
import '../../commands/login.command.cy';

describe('Adverts', () => {
  before(() => {
    cy.signIn('seller@gmail.com', '123qwe!@#QWE', 201, 'SELLER');
    cy.signIn('manager@gmail.com', '123qwe!@#QWE', 201, 'MANAGER');
    cy.signIn('admin@admin.admin', '123qwe!@#QWE', 201, 'ADMIN');
    cy.signIn('client@gmail.com', '123qwe!@#QWE', 201, 'CLIENT');
  });

  it('200 get brands as anonimus', function () {
    cy.request({
      method: 'GET',
      url: Cypress.env('baseUrl') + `/brands`,
    })
      .then((res) => {
        Cypress.env('anyModelId', res.body[0].models[0].id);
      })
      .its('status')
      .should('eq', 200);
  });

  it('403 Create advert as a client', function () {
    cy.createMyAdvert(
      {
        description: 'Super fucking car',
        model_id: Cypress.env('anyModelId'),
        price: 500000,
        currency: 'UAH',
      },
      403,
      'CLIENT',
    );
  });

  it('201 Create an advert with bad words as a seller', function () {
    cy.createMyAdvert(
      {
        description: 'Super fucking car',
        model_id: Cypress.env('anyModelId'),
        price: 500000,
        currency: 'UAH',
      },
      201,
      'SELLER',
    );
  });

  it('200 Update an advert with bad words as a seller. First attempt.', function () {
    cy.updateMyAdvert(
      Cypress.env('lastAdvertId'),
      {
        description: 'Super fucking car',
        model_id: Cypress.env('anyModelId'),
        price: 600000,
        currency: 'UAH',
      },
      200,
      'SELLER',
    );
  });

  it('200 Update an advert with bad words as a seller. Second attempt.', function () {
    cy.updateMyAdvert(
      Cypress.env('lastAdvertId'),
      {
        description: 'Super fucking car',
        model_id: Cypress.env('anyModelId'),
        price: 600000,
        currency: 'UAH',
      },
      200,
      'SELLER',
    );
  });

  it('403 Update an advert with bad words as a seller. Third attempt.', function () {
    cy.updateMyAdvert(
      Cypress.env('lastAdvertId'),
      {
        description: 'Super fucking car',
        model_id: Cypress.env('anyModelId'),
        price: 600000,
        currency: 'UAH',
      },
      403,
      'SELLER',
    );
  });

  it('200 Update an advert with bad words as a manager.', function () {
    cy.updateAdvert(
      Cypress.env('lastAdvertId'),
      {
        description: 'Super fucking car',
        model_id: Cypress.env('anyModelId'),
        price: 600000,
        currency: 'UAH',
        status: 'ACTIVE',
        revision: 3,
      },
      200,
      'MANAGER',
    );
  });

  it('200 Update an advert without bad words as a seller. Third attempt.', function () {
    cy.updateMyAdvert(
      Cypress.env('lastAdvertId'),
      {
        description: 'Super fast car',
        model_id: Cypress.env('anyModelId'),
        price: 700000,
        currency: 'UAH',
      },
      200,
      'SELLER',
    );
  });

  it('403 Create second advert as a seller', function () {
    cy.createMyAdvert(
      {
        description: 'Super car',
        model_id: Cypress.env('anyModelId'),
        price: 500000,
        currency: 'UAH',
      },
      403,
      'SELLER',
    );
  });

  it('404 Delete adwert with wrong id as a seller', function () {
    cy.deleteMyAdvert('e57bbb32-4502-4bf6-97fb-2b2b9d8236d4', 404, 'SELLER');
  });

  it('200 Delete adwert as a seller', function () {
    cy.deleteMyAdvert(Cypress.env('lastAdvertId'), 200, 'SELLER');
  });

  it('201 Create an advert as a seller', function () {
    cy.createMyAdvert(
      {
        description: 'Super fucking car',
        model_id: Cypress.env('anyModelId'),
        price: 500000,
        currency: 'UAH',
      },
      201,
      'SELLER',
    );
  });

  it('200 Delete adwert as a manager', function () {
    cy.deleteAdvert(Cypress.env('lastAdvertId'), 200, 'MANAGER');
  });

  it('201 Create an advert as a seller', function () {
    cy.createMyAdvert(
      {
        description: 'Super fucking car',
        model_id: Cypress.env('anyModelId'),
        price: 500000,
        currency: 'UAH',
      },
      201,
      'SELLER',
    );
  });

  it('200 get my adverts as seller and delete all of them', function () {
    const accessToken = Cypress.env('SELLERAccessToken');
    const authorization = `Bearer ${accessToken}`;
    cy.request({
      method: 'GET',
      headers: {
        authorization,
      },
      url: Cypress.env('baseUrl') + `/adverts/my`,
    })
      .then((res) => {
        for (const advert of res.body) {
          cy.deleteMyAdvert(advert.id, 200, 'SELLER');
        }
        return cy.wrap(res);
      })
      .its('status')
      .should('eq', 200);
  });
});
