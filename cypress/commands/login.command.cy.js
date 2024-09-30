Cypress.Commands.add('signIn', (email, password, code, role) => {
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
        Cypress.env(
          `${role}AccessToken`,
          signUpResponse.body.tokens.accessToken,
        );
        Cypress.env(`${role}id`, signUpResponse.body.user.id);
      }
      return signUpResponse;
    })
    .its('status')
    .should('eq', code);
});

Cypress.Commands.add('signUp', (name, email, password, role, codes) => {
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
      if (signUpResponse.body.tokens) {
        Cypress.env(
          `${role}AccessToken`,
          signUpResponse.body.tokens.accessToken,
        );
        Cypress.env(`${role}id`, signUpResponse.body.user.id);
      }
      return signUpResponse;
    })
    .its('status')
    .should('oneOf', codes);
});
