class Assertions {
  shouldHaveStatus(response, statusCode) {
    expect(response.status, `status is ${statusCode}`).to.equal(statusCode);
  }

  validateContractOf(response, schema) {
    return cy.wrap(response.body).should(schema);
  }

  booking = {
    shouldBookingIdNotBeNull(response) {
      expect(response.body.bookingid, 'bookingid exists').to.not.be.null;
    },

    shouldResponseBodyNotBeEmpty(response) {
      expect(response.body.length, 'body is not empty').to.be.greaterThan(0);
    },

    shouldResponseBodyBeEmpty(response) {
      expect(response.body.length, 'body is empty').to.equal(0);
    },

    shouldHaveDefaultHeaders(response) {
      expect(response.headers, 'default headers exist').to.include({
        server: 'Cowboy',
        connection: 'keep-alive',
        'x-powered-by': 'Express',
      });
    },

    shouldHaveContentTypeHeaderWithValue(response, contentTypeValue) {
      expect(response.headers, 'content-type header exists').to.include({
        'content-type': contentTypeValue,
      });
    },

    shouldResponseDurationBeLessThan(response, maxDuration) {
      expect(response.duration, 'duration is valid').lessThan(maxDuration);
    },
  }

  auth = {
    shouldHaveBodyWithBadCredentials(response) {
      expect(response.body, 'body with bad credentials').to.include({
        reason: 'Bad credentials',
      });
    },
  }
}

export default new Assertions();
