// https://docs.cypress.io/api/introduction/api.html

describe("sanity test", () => {
  before(() => {
    cy.server();
  });

  it("sanity test", () => {
    cy.visit("/");
  });
});
