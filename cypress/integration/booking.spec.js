/// <reference types="cypress" />

import request from '../support/api/requests';
import assertion from '../support/api/assertions';
import schema from '../support/api/schemas';

before(() => {
  request.doAuth();
});

context('Booking', () => {
  context('GET', () => {
    it('should show a single booking', () => {
      request.getSingleBooking().then(response => {
        assertion.validateContractOf(response, schema.getSingleBookingSchema());
      });
    });
  });

  context('POST', () => {
    it('should create a single booking', () => {
      request.postSingleBooking().then(response => {
        assertion.shouldHaveStatus(response, 200);
        assertion.booking.shouldBookingIdNotBeNull(response);
        assertion.booking.shouldHaveDefaultHeaders(response);
        assertion.booking.shouldHaveContentTypeHeaderWithValue(
          response, 
          'application/json; charset=utf-8'
        );
        assertion.booking.shouldResponseDurationBeLessThan(response, 1000);
      });
    });
  });

  context('PUT', () => {
    it('should not edit a single booking without token', () => {
      request.postSingleBooking().then(response => {
        request.putSingleBookingWithoutToken(response).then(response => {
          assertion.shouldHaveStatus(response, 403);
        });
      });
    });
    
    it('should not edit a single booking with invalid token', () => {
      request.postSingleBooking().then(response => {
        request.putSingleBookingWithToken(response, 'invalid token')
          .then(response => {
            assertion.shouldHaveStatus(response, 403);
          }
        );
      });
    });

    it('should edit a single booking with valid token', () => {
      request.postSingleBooking().then(response => {
        request.putSingleBookingWithToken(response, Cypress.env('token'))
          .then(response => {
            assertion.shouldHaveStatus(response, 200);
          }
        );
      });
    });
  });

  context('DELETE', () => {
    it('should not delete a single booking without token', () => {
      request.postSingleBooking().then(response => {
        request.deleteSingleBookingWithoutToken(response).then(response => {
          assertion.shouldHaveStatus(response, 403);
        });
      });
    });

    it('should not delete a single booking with invalid token', () => {
      request.postSingleBooking().then(response => {
        request.deleteSingleBookingWithToken(response, 'invalid token')
          .then(response => {
            assertion.shouldHaveStatus(response, 403);
          }
        );
      });
    });

    it('should delete a single booking with valid token', () => {
      request.postSingleBooking().then(response => {
        request.deleteSingleBookingWithToken(response, Cypress.env('token'))
          .then(response => {
            assertion.shouldHaveStatus(response, 201);
          }
        );
      });
    });
  });
});
