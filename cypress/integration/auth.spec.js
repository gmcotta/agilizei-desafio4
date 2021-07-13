/// <reference types="cypress" />

import request from '../support/api/requests';
import assertion from '../support/api/assertions';
import schema from '../support/api/schemas';

context('Auth', () => {
  context('POST', () => {
    it('should validate token creation contract @contract', () => {
      request.postGenerateToken('admin', 'password123').then(postResponse => {
        assertion.validateContractOf(
          postResponse,
          schema.postGenerateTokenSchema()
        );
      });
    });

    it('should generate the token @functional', () => {
      request.postGenerateToken('admin', 'password123').then(postResponse => {
        assertion.shouldHaveStatus(postResponse, 200);
        assertion.booking.shouldBookingIdNotBeNull(postResponse);
        assertion.booking.shouldHaveDefaultHeaders(postResponse);
        assertion.booking.shouldHaveContentTypeHeaderWithValue(
          postResponse, 
          'application/json; charset=utf-8'
        );
        assertion.booking.shouldResponseDurationBeLessThan(postResponse, 1000);
      });
    });

    it(
      'should not generate the token if credentials are wrong @functional', 
      () => {
        request.postGenerateToken('aaa', 'bbb').then(postResponse => {
          assertion.auth.shouldHaveBodyWithBadCredentials(postResponse);
        });
      }
    );
  });
});