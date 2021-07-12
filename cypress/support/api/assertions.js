class Assertions {
  shouldHaveStatus(response, statusCode) {
    expect(response.status).to.equal(statusCode);
  }
}

export default new Assertions();
