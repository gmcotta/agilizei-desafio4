import spok from 'cy-spok';

class Schemas {
  getSingleBookingSchema() {
    return spok(
      {
        firstname: spok.string,
        lastname: spok.string,
        totalprice: spok.number,
        depositpaid: spok.type('boolean'),
        bookingdates: {
          checkin: spok.string,
          checkout: spok.string,
        },
        additionalneeds: spok.string,
      }
    );
  }

  postSingleBookingSchema() {
    return spok(
      {
        bookingid: spok.number,
        booking: {
          firstname: spok.string,
          lastname: spok.string,
          totalprice: spok.number,
          depositpaid: spok.type('boolean'),
          bookingdates: {
            checkin: spok.string,
            checkout: spok.string,
          },
          additionalneeds: spok.string,
        }
      }
    );
  }
  
  putSingleBookingSchema() {
    return spok(
      {
        firstname: spok.string,
        lastname: spok.string,
        totalprice: spok.number,
        depositpaid: spok.type('boolean'),
        bookingdates: {
          checkin: spok.string,
          checkout: spok.string,
        },
        additionalneeds: spok.string,
      }
    );
  }

  postGenerateTokenSchema() {
    return spok(
      {
        token: spok.string,
      }
    )
  }
}

export default new Schemas();
