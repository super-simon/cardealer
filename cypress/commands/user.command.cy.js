Cypress.Commands.add(
  'createUser',
  (name, email, password, role, codes, creatorRole) => {
    const accessToken = Cypress.env(`${creatorRole}AccessToken`);
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
      .should('oneOf', codes);
  },
);
