/// <reference types="cypress" />

import request from '../support/api/requests';
import assertion from '../support/api/assertions';

context('Ping', () => {
  it('GET Healthcheck', () => {
    request.getPing().then(response => {
      assertion.shouldHaveStatus(response, 201);
    });
  });
});