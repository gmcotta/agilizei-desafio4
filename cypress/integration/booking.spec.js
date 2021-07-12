/// <reference types="cypress" />

import request from '../support/api/requests';
import assertion from '../support/api/assertions';
import schema from '../support/api/schemas';

before(() => {
  request.doAuth();
});

context('Booking', () => {
  context('GET', () => {
    it('should validate single booking contract @contract', () => {
      request.getSingleBooking().then(response => {
        assertion.validateContractOf(response, schema.getSingleBookingSchema());
      });
    });
  });

  context('POST', () => {
    it('should create a single booking @functional', () => {
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
    it('should not edit a single booking without token @functional', () => {
      request.postSingleBooking().then(postResponse => {
        const id = postResponse.body.bookingid;

        request.putSingleBookingWithoutToken(id).then(response => {
          assertion.shouldHaveStatus(response, 403);
        });
      });
    });
    
    it(
      'should not edit a single booking with invalid token @functional',
      () => {
        request.postSingleBooking().then(postResponse => {
          const id = postResponse.body.bookingid;

          request.putSingleBookingWithToken(id, 'invalid-token')
            .then(response => {
              assertion.shouldHaveStatus(response, 403);
            }
          );
        });
      }
    );

    it('should not edit a single booking with invalid booking id', () => {
      request.postSingleBooking().then(response => {
        const id = 'invalid-id';

        request.putSingleBookingWithToken(id, Cypress.env('token'))
          .then(response => {
            assertion.shouldHaveStatus(response, 405);
          });
      });
    });

    it('should edit a single booking with valid token @functional', () => {
      request.postSingleBooking().then(postResponse => {
        const id = postResponse.body.bookingid;

        request.putSingleBookingWithToken(id, Cypress.env('token'))
          .then(putResponse => {
            assertion.shouldHaveStatus(putResponse, 200);
          }
        );
      });
    });
  });

  context('DELETE', () => {
    it('should not delete a single booking without token @functional', () => {
      request.postSingleBooking().then(postResponse => {
        const id = postResponse.body.bookingid;

        request.deleteSingleBookingWithoutToken(id).then(response => {
          assertion.shouldHaveStatus(response, 403);
        });
      });
    });

    it(
      'should not delete a single booking with invalid token @functional', 
      () => {
        request.postSingleBooking().then(postResponse => {
          const id = postResponse.body.bookingid;
          request.deleteSingleBookingWithToken(id, 'invalid-token')
            .then(response => {
              assertion.shouldHaveStatus(response, 403);
            }
          );
        });
      }
    );
    
    it(
      'should not delete a single booking with invalid id @functional', 
      () => {
        request.postSingleBooking().then(response => {
          const id = 'invalid-id';
          request.deleteSingleBookingWithToken(id, Cypress.env('token'))
            .then(response => {
              assertion.shouldHaveStatus(response, 405);
            }
          );
        });
      }
    );

    it('should delete a single booking with valid token @functional', () => {
      request.postSingleBooking().then(postResponse => {
        const id = postResponse.body.bookingid;
        request.deleteSingleBookingWithToken(id, Cypress.env('token'))
          .then(response => {
            assertion.shouldHaveStatus(response, 201);
          }
        );
      });
    });
  });
});
