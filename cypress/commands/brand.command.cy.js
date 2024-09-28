Cypress.Commands.add('createBrand', (title, code) => {
  const accessToken = Cypress.env('accessToken');
  const authorization = `Bearer ${accessToken}`;
  cy.request({
    method: 'POST',
    url: Cypress.env('baseUrl') + '/brands',
    body: {
      title,
    },
    headers: {
      authorization,
    },
    failOnStatusCode: false,
  })
    .its('status')
    .should('eq', code);
});

Cypress.Commands.add('updateBrandByName', (name, title, code) => {
  const accessToken = Cypress.env('accessToken');
  const authorization = `Bearer ${accessToken}`;
  cy.request({
    method: 'PATCH',
    url: Cypress.env('baseUrl') + `/brands/by-name/${name}`,
    body: {
      title,
    },
    headers: {
      authorization,
    },
    failOnStatusCode: false,
  })
    .then((res) => {
      Cypress.env('lastBrandId', res.body.id);
      return res;
    })
    .its('status')
    .should('eq', code);
});

Cypress.Commands.add('updateBrandById', (id, title, code) => {
  const accessToken = Cypress.env('accessToken');
  const authorization = `Bearer ${accessToken}`;
  cy.request({
    method: 'PATCH',
    url: Cypress.env('baseUrl') + `/brands/${id}`,
    body: {
      title,
    },
    headers: {
      authorization,
    },
    failOnStatusCode: false,
  })
    .then((res) => {
      Cypress.env('lastBrandId', res.body.id);
      return res;
    })
    .its('status')
    .should('eq', code);
});

Cypress.Commands.add('deleteBrandById', (id, code) => {
  const accessToken = Cypress.env('accessToken');
  const authorization = `Bearer ${accessToken}`;
  cy.request({
    method: 'DELETE',
    url: Cypress.env('baseUrl') + `/brands/${id}`,
    headers: {
      authorization,
    },
    failOnStatusCode: false,
  })
    .its('status')
    .should('eq', code);
});
