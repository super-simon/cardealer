describe('Users', () => {
  it('400 when get a user with broken uuid', function () {
    cy.request({
      method: 'GET',
      url: Cypress.env('baseUrl') + '/users/asfd',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});
