describe("sanity test", () => {
  it("sanity test", () => {
    cy.visit("/");
    expect(true).to.equal(true);
  });
});
