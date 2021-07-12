/// <reference types="cypress" />

context('Ping', () => {
  it('GET Healthcheck', () => {
    cy.request({
      method: 'GET',
      url: '/ping'
    }).its('status').should('equal', 201);
  });
});