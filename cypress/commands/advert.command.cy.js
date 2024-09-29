Cypress.Commands.add('createMyAdvert', (data, code, role) => {
  const accessToken = Cypress.env(`${role}AccessToken`);
  const authorization = `Bearer ${accessToken}`;
  cy.request({
    method: 'POST',
    url: Cypress.env('baseUrl') + '/adverts/my',
    body: data,
    headers: {
      authorization,
    },
    failOnStatusCode: false,
  })
    .then((res) => {
      if (res.status === 201) {
        Cypress.env('lastAdvertId', res.body.id);
        return res;
      }
    })
    .its('status')
    .should('eq', code);
});

Cypress.Commands.add('updateMyAdvert', (id, data, code, role) => {
  const accessToken = Cypress.env(`${role}AccessToken`);
  const authorization = `Bearer ${accessToken}`;
  cy.request({
    method: 'PATCH',
    url: Cypress.env('baseUrl') + `/adverts/my/${id}`,
    body: data,
    headers: {
      authorization,
    },
    failOnStatusCode: false,
  })
    .its('status')
    .should('eq', code);
});

Cypress.Commands.add('updateAdvert', (id, data, code, role) => {
  const accessToken = Cypress.env(`${role}AccessToken`);
  const authorization = `Bearer ${accessToken}`;
  cy.request({
    method: 'PATCH',
    url: Cypress.env('baseUrl') + `/adverts/${id}`,
    body: data,
    headers: {
      authorization,
    },
    failOnStatusCode: false,
  })
    .its('status')
    .should('eq', code);
});

Cypress.Commands.add('deleteMyAdvert', (id, code, role) => {
  const accessToken = Cypress.env(`${role}AccessToken`);
  const authorization = `Bearer ${accessToken}`;
  cy.request({
    method: 'DELETE',
    url: Cypress.env('baseUrl') + `/adverts/my/${id}`,
    headers: {
      authorization,
    },
    failOnStatusCode: false,
  })
    .its('status')
    .should('eq', code);
});
