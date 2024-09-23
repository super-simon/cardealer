Cypress.Commands.add('createUser', (name, email, password, role, code) => {
  const accessToken = Cypress.env('accessToken');
  const authorization = `Bearer ${accessToken}`;
  cy.request({
    method: 'POST',
    url: Cypress.env('baseUrl') + '/users/create',
    body: {
      name,
      email,
      password,
      role,
    },
    headers: {
      authorization,
    },
    failOnStatusCode: false,
  })
    .its('status')
    .should('eq', code);
});
