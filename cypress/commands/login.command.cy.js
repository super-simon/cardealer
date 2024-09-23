Cypress.Commands.add('signIn', (email, password, code) => {
  cy.request({
    method: 'POST',
    url: Cypress.env('baseUrl') + '/auth/sign-in',
    body: {
      email,
      password,
      deviceId: 'cypress',
    },
    failOnStatusCode: false,
  })
    .as('signUpResponse')
    .then((signUpResponse) => {
      if (signUpResponse.body.tokens) {
        Cypress.env('accessToken', signUpResponse.body.tokens.accessToken);
      }
      return signUpResponse;
    })
    .its('status')
    .should('eq', code);
});

Cypress.Commands.add('signUp', (name, email, password, role, code) => {
  cy.request({
    method: 'POST',
    url: Cypress.env('baseUrl') + '/auth/sign-up',
    body: {
      name,
      email,
      password,
      role,
      deviceId: 'cypress',
    },
    failOnStatusCode: false,
  })
    .as('signUpResponse')
    .then((signUpResponse) => {
      console.log(signUpResponse);
      if (signUpResponse.body.tokens) {
        Cypress.env('accessToken', signUpResponse.body.tokens.accessToken);
      }
      return signUpResponse;
    })
    .its('status')
    .should('eq', code);
});
