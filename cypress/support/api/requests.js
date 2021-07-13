class Requests {
  getPing() {
    return cy.request({
      method: 'GET',
      url: '/ping'
    });
  }

  getSingleBooking() {
    return cy.request({
      method: 'GET',
      url: '/booking/2',
    });
  }

  getAllBookings() {
    return cy.request({
      method: 'GET',
      url: '/booking',
    });
  }

  getAllBookingsWithQueryString(queryString) {
    return cy.request({
      method: 'GET',
      url: '/booking',
      qs: queryString,
    });
  }

  postSingleBooking() {
    return cy.request({
      method: 'POST',
      url: '/booking',
      body: {
        firstname: "Jim",
        lastname: "Brown",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
            checkin: "2020-01-01",
            checkout: "2020-01-02"
        },
        additionalneeds: "Breakfast"
      }
    });
  }

  putSingleBookingWithoutToken(id) {
    return cy.request({
      method: 'PUT',
      url: `/booking/${id}`,
      body: {
        "firstname": "Jim",
        "lastname": "James",
        "totalprice": 500,
        "depositpaid": true,
        "bookingdates": {
          "checkin": "2021-01-01",
          "checkout": "2021-01-02"
        },
        "additionalneeds": "Dinner"
      },
      failOnStatusCode: false,
    });
  }
  
  putSingleBookingWithToken(id, token) {
    return cy.request({
      method: 'PUT',
      url: `/booking/${id}`,
      body: {
        "firstname": "Jim",
        "lastname": "James",
        "totalprice": 500,
        "depositpaid": true,
        "bookingdates": {
          "checkin": "2021-01-01",
          "checkout": "2021-01-02"
        },
        "additionalneeds": "Dinner"
      },
      headers: {
        cookie: `token=${token}`
      },
      failOnStatusCode: false,
    });
  }

  putSingleBookingWithAuthorization(id, authorization) {
    return cy.request({
      method: 'PUT',
      url: `/booking/${id}`,
      body: {
        "firstname": "Jim",
        "lastname": "James",
        "totalprice": 500,
        "depositpaid": true,
        "bookingdates": {
          "checkin": "2021-01-01",
          "checkout": "2021-01-02"
        },
        "additionalneeds": "Dinner"
      },
      headers: {
        authorization: `Basic ${authorization}`
      },
      failOnStatusCode: false,
    });
  }

  deleteSingleBookingWithoutToken(id) {
    return cy.request({
      method: 'DELETE',
      url: `/booking/${id}`,
      failOnStatusCode: false,
    });
  }
  
  deleteSingleBookingWithToken(id, token) {
    return cy.request({
      method: 'DELETE',
      url: `/booking/${id}`,
      headers: {
        Cookie: `token=${token}`
      },
      failOnStatusCode: false,
    });
  }

  postGenerateToken() {
    return cy.request({
      method: 'POST',
      url: '/auth',
      body: {
        username: 'admin',
        password: 'password123'
      }
    })
  }

  doAuth() {
    this.postGenerateToken().then(response => {
      const token = response.body.token;
      Cypress.env('token', token);
    });
  }
}

export default new Requests();
