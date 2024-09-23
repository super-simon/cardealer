describe('Test', () => {
  it('Get the test url', function () {
    cy.request({
      method: 'GET',
      url: Cypress.env('baseUrl') + '/auth/test',
    }).then((response) => {
      expect(response.status).to.eq(200);
      // expect(response.body.results).length.to.be.greaterThan(1);
    });
  });
});
