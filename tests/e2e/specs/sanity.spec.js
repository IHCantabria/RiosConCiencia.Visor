// https://docs.cypress.io/api/introduction/api.html
before(() => {
  cy.server();
});
describe("sanity test", () => {
  it("sanity test", () => {
    cy.visit("/");
  });
});
