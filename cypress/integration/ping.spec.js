/// <reference types="cypress" />

import request from '../support/api/requests';
import assertion from '../support/api/assertions';

context('Ping', () => {
  context('GET', () => {
    it('should validate application @healthcheck', () => {
      request.getPing().then(response => {
        assertion.shouldHaveStatus(response, 201);
      });
    });
  });
});
