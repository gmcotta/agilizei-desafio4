# Agilizei Bootcamp - Challenge 4

The challenge is to complement the test made on the Level 4 of the bootcamp, which we improve our understanding about API testing.

The testing application is [Treinamento-API](https://treinamento-api.herokuapp.com/), and the endpoints tested are:

- /auth;
- /booking;
- /ping.

## Videos

### Auth endpoint
![Auth endpoint](.github/assets/images/auth.spec.js.gif)

### Booking endpoint
![Booking endpoint](.github/assets/images/booking.spec.js.gif)

### Ping endpoint
![Ping endpoint](.github/assets/images/ping.spec.js.gif)

## How to run

Clone the repository:

`git clone https://github.com/gmcotta/agilizei-desafio4.git`

Install the dependencies:

`npm install`

To test the complete API:

`npm run test`

To test the healthcheck tests:

`npm run test:contract`

To test the contract tests:

`npm run test:functional`

To test the functional tests:

`npm run test:healthcheck`