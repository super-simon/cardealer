Cypress.Commands.add('createModel', (title, brand_id, code, role) => {
  const accessToken = Cypress.env(`${role}AccessToken`);
  const authorization = `Bearer ${accessToken}`;
  cy.request({
    method: 'POST',
    url: Cypress.env('baseUrl') + '/models',
    body: {
      title,
      brand_id,
    },
    headers: {
      authorization,
    },
    failOnStatusCode: false,
  })
    .then((res) => {
      if (res.status === 201) {
        Cypress.env('lastModelId', res.body.id);
        return res;
      }
    })
    .its('status')
    .should('eq', code);
});

Cypress.Commands.add('updateModel', (id, title, code, role) => {
  const accessToken = Cypress.env(`${role}AccessToken`);
  const authorization = `Bearer ${accessToken}`;
  cy.request({
    method: 'PATCH',
    url: Cypress.env('baseUrl') + `/models/${id}`,
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

Cypress.Commands.add('deleteModel', (id, code, role) => {
  const accessToken = Cypress.env(`${role}AccessToken`);
  const authorization = `Bearer ${accessToken}`;
  cy.request({
    method: 'DELETE',
    url: Cypress.env('baseUrl') + `/models/${id}`,
    headers: {
      authorization,
    },
    failOnStatusCode: false,
  })
    .its('status')
    .should('eq', code);
});
