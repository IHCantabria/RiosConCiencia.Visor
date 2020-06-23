describe("filters panel tests", () => {
  before(function() {
    cy.server();
    cy.route({
      method: "GET",
      url: "/v1/public/Sources?Access-Control-Allow-Origin=*"
    }).as("apiSources");
    cy.route({
      method: "GET",
      url: "/v1/public/Buoys/BuoyTypes"
    }).as("apiBuoyTypes");
    cy.route({
      method: "GET",
      url: "/v1/public/Stations/StationTypes"
    }).as("apiStationTypes");
    cy.route({
      method: "GET",
      url: "/v1/public/ProductMoments?Access-Control-Allow-Origin=*"
    }).as("apiProductMoments");
    cy.route({
      method: "GET",
      url:
        "/v1/public/ProductMoments/1/VariableTypes?Access-Control-Allow-Origin=*"
    }).as("variableTypes1");
    cy.route({
      method: "GET",
      url:
        "/v1/public/ProductMoments/2/VariableTypes?Access-Control-Allow-Origin=*"
    }).as("variableTypes2");
    cy.route({
      method: "GET",
      url:
        "/v1/public/ProductMoments/3/VariableTypes?Access-Control-Allow-Origin=*"
    }).as("variableTypes3");
    cy.route({
      method: "GET",
      url:
        "/v1/public/ProductMoments/4/VariableTypes?Access-Control-Allow-Origin=*"
    }).as("variableTypes4");
    cy.visit("/");
    cy.wait([
      "@apiSources",
      "@apiBuoyTypes",
      "@apiStationTypes",
      "@apiProductMoments",
      "@variableTypes1",
      "@variableTypes2",
      "@variableTypes3",
      "@variableTypes4"
    ]);
    cy.get("[data-cy=filtersToggle]").click();
  });
  it("clicking on 'advanced filters' show the advanced filters menu", () => {
    cy.get("[data-cy=filtersAdvancedToggle").should("exist");
    cy.get(".vs-dropdown--custom").should("not.exist");
    cy.get("[data-cy=filtersPanel]").should(
      "have.class",
      "top-panel-body__reduced"
    );
    cy.get("[data-cy=filtersToggle]").click();
    cy.get("[data-cy=filtersPanel]").should(
      "have.class",
      "top-panel-body__expanded"
    );
    cy.get("[data-cy=filtersAdvancedToggle]").click();
    cy.get(".vs-dropdown--custom").should("exist");
    cy.get("[data-cy=filtersToggle]").click();
  });
  it("clicking on 'switcher' change the options selected", () => {
    cy.get("[data-cy=filtersAdvancedToggle").should("exist");
    cy.get(".vs-dropdown--custom").should("not.exist");
    cy.get("[data-cy=filtersPanel]").should(
      "have.class",
      "top-panel-body__reduced"
    );
    cy.get("[data-cy=filtersToggle]").click();
    cy.get("[data-cy=filtersPanel]").should(
      "have.class",
      "top-panel-body__expanded"
    );
    cy.get("[data-cy=filtersAdvancedToggle]").click();
    cy.get(".vs-dropdown--custom").should("exist");
    cy.get(".vs-dropdown--custom > :nth-child(1) > button > input").should(
      "have.value",
      "false"
    );
    cy.get(".vs-dropdown--custom > :nth-child(2) > button > input").should(
      "have.value",
      "true"
    );
    cy.get(".vs-dropdown--custom > :nth-child(1) > button > input").click();
    cy.get(".vs-dropdown--custom > :nth-child(2) > button > input").click();
    cy.get(".vs-dropdown--custom > :nth-child(1) > button > input").should(
      "have.value",
      "true"
    );
    cy.get(".vs-dropdown--custom > :nth-child(2) > button > input").should(
      "have.value",
      "false"
    );
    cy.get("[data-cy=filtersToggle]").click();
  });
  it("clicking on 'timeline' change the options of the variables", () => {
    cy.get("[data-cy=filtersAdvancedToggle").should("exist");
    cy.get("[data-cy=filtersPanel]").should(
      "have.class",
      "top-panel-body__reduced"
    );
    cy.get("[data-cy=filtersToggle]").click();
    cy.get("[data-cy=filtersPanel]").should(
      "have.class",
      "top-panel-body__expanded"
    );
    cy.get("[data-cy=filtersAdvancedToggle]").click();
    cy.get(".vs-dropdown--custom").should("exist");
    cy.get(".vs-dropdown--custom > :nth-child(1) > button > input").should(
      "have.value",
      "true"
    );
    cy.get(".vs-dropdown--custom > :nth-child(1) > button > input").click();
    cy.get(".vs-dropdown--custom > :nth-child(1) > button > input").should(
      "have.value",
      "false"
    );
    cy.get(".range-labels > :nth-child(1)").should("have.class", "active");
    cy.get("ul.radio-opts")
      .children()
      .should("have.length", 8);
    cy.get(".range-labels > :nth-child(2)").click();
    cy.get(".range-labels > :nth-child(1)").should("not.have.class", "active");
    cy.get(".range-labels > :nth-child(2)").should("have.class", "active");
    cy.get("ul.radio-opts")
      .children()
      .should("have.length", 5);
    cy.get(".range-labels > :nth-child(1)").click();
    cy.get("[data-cy=filtersToggle]").click();
  });
  it("clicking on 'timeline' reset the variable selected and selec the first", () => {
    cy.get("[data-cy=filtersAdvancedToggle").should("exist");
    cy.get("[data-cy=filtersPanel]").should(
      "have.class",
      "top-panel-body__reduced"
    );
    cy.get("[data-cy=filtersToggle]").click();
    cy.get("[data-cy=filtersPanel]").should(
      "have.class",
      "top-panel-body__expanded"
    );
    cy.get(".range-labels > :nth-child(1)").should("have.class", "active");
    cy.get("ul.radio-opts")
      .children()
      .should("have.length", 8);
    cy.get(".range-labels > :nth-child(2)").click();
    cy.get(".range-labels > :nth-child(1)").should("not.have.class", "active");
    cy.get(".range-labels > :nth-child(2)").should("have.class", "active");
    cy.get("ul.radio-opts")
      .children()
      .should("have.length", 5);
  });
  //TODO:improve test E2E and full aplication tests
});
