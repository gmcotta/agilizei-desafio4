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
      request.getSingleBooking().then(getResponse => {
        assertion.validateContractOf(
          getResponse,
          schema.getSingleBookingSchema()
        );
      });
    });

    it('should show a list of all bookings @functional', () => {
      request.getAllBookings().then(getResponse => {
        assertion.booking.shouldResponseBodyNotBeEmpty(getResponse);
      });
    });

    it('should show a list with bookings of Mark Smith @functional', () => {
      request.getAllBookingsWithQueryString({
        firstname: 'Mark',
        lastname: 'Smith',
      }).then(getResponse => {
        assertion.booking.shouldResponseBodyNotBeEmpty(getResponse);
      });
    });

    it('should show an empty list with bookings of AAA BBB @functional', () => {
      request.getAllBookingsWithQueryString({
        firstname: 'AAA',
        lastname: 'BBB',
      }).then(getResponse => {
        assertion.booking.shouldResponseBodyBeEmpty(getResponse);
      });
    });

    it(
      'should show a list with bookings starting on 2015-10-27 and ending on 2017-10-17 @functional', 
      () => {
        request.getAllBookingsWithQueryString({
          checkin: '2015-10-27',
          checkout: '2017-10-17',
        }).then(getResponse => {
          assertion.booking.shouldResponseBodyNotBeEmpty(getResponse);
        });
      }
    );

    it(
      'should show an empty list with bookings starting on 2040-10-27 and ending on 2041-10-17 @functional', 
      () => {
        request.getAllBookingsWithQueryString({
          checkin: '2040-10-27',
          checkout: '2041-10-17',
        }).then(getResponse => {
          assertion.booking.shouldResponseBodyBeEmpty(getResponse);
        });
      }
    );
  });

  context('POST', () => {
    it('should validate single booking contract @contract', () => {
      request.postSingleBooking().then(postResponse => {
        assertion.validateContractOf(
          postResponse, 
          schema.postSingleBookingSchema()
        );
      });
    });
    
    it('should create a single booking @functional', () => {
      request.postSingleBooking().then(postResponse => {
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
  });

  context('PUT', () => {
    it('should validate single booking contract @contract', () => {
      request.postSingleBooking().then(postResponse => {
        const id = postResponse.body.bookingid;

        request.putSingleBookingWithToken(id, Cypress.env('token'))
          .then(putResponse => {
            assertion.validateContractOf(
              putResponse, 
              schema.putSingleBookingSchema()
            );
          }
        );
      });
    });

    it('should not edit a single booking without token @functional', () => {
      request.postSingleBooking().then(postResponse => {
        const id = postResponse.body.bookingid;

        request.putSingleBookingWithoutToken(id).then(putResponse => {
          assertion.shouldHaveStatus(putResponse, 403);
        });
      });
    });
    
    it(
      'should not edit a single booking with invalid token @functional',
      () => {
        request.postSingleBooking().then(postResponse => {
          const id = postResponse.body.bookingid;

          request.putSingleBookingWithToken(id, 'invalid-token')
            .then(putResponse => {
              assertion.shouldHaveStatus(putResponse, 403);
            }
          );
        });
      }
    );

    it(
      'should not edit a single booking with invalid booking id @functional', 
      () => {
        request.postSingleBooking().then(() => {
          const id = 'invalid-id';

          request.putSingleBookingWithToken(id, Cypress.env('token'))
            .then(putResponse => {
              assertion.shouldHaveStatus(putResponse, 405);
            });
        });
      }
    );

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

    it(
      'should not edit a single booking with an invalid authorization @functional', 
      () => {
        request.postSingleBooking().then(postResponse => {
          const id = postResponse.body.bookingid;

          request.putSingleBookingWithAuthorization(
            id, 
            'YWRtaW46cGFzc3dvcmQxMjM+'
          ).then(putResponse => {
            assertion.shouldHaveStatus(putResponse, 403);
          });
        });
      }
    );
    
    it(
      'should edit a single booking with a valid authorization @functional', 
      () => {
        request.postSingleBooking().then(postResponse => {
          const id = postResponse.body.bookingid;

          request.putSingleBookingWithAuthorization(
            id, 
            'YWRtaW46cGFzc3dvcmQxMjM='
          ).then(putResponse => {
            assertion.shouldHaveStatus(putResponse, 200);
          });
        });
      }
    );
  });

  context('DELETE', () => {
    it('should not delete a single booking without token @functional', () => {
      request.postSingleBooking().then(postResponse => {
        const id = postResponse.body.bookingid;

        request.deleteSingleBookingWithoutToken(id).then(deleteResponse => {
          assertion.shouldHaveStatus(deleteResponse, 403);
        });
      });
    });

    it(
      'should not delete a single booking with invalid token @functional', 
      () => {
        request.postSingleBooking().then(postResponse => {
          const id = postResponse.body.bookingid;
          request.deleteSingleBookingWithToken(id, 'invalid-token')
            .then(deleteResponse => {
              assertion.shouldHaveStatus(deleteResponse, 403);
            }
          );
        });
      }
    );
    
    it(
      'should not delete a single booking with invalid id @functional', 
      () => {
        request.postSingleBooking().then(() => {
          const id = 'invalid-id';
          request.deleteSingleBookingWithToken(id, Cypress.env('token'))
            .then(deleteResponse => {
              assertion.shouldHaveStatus(deleteResponse, 405);
            }
          );
        });
      }
    );

    it('should delete a single booking with valid token @functional', () => {
      request.postSingleBooking().then(postResponse => {
        const id = postResponse.body.bookingid;
        request.deleteSingleBookingWithToken(id, Cypress.env('token'))
          .then(deleteResponse => {
            assertion.shouldHaveStatus(deleteResponse, 201);
          }
        );
      });
    });
  });
});
