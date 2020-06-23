describe("navigation tests", () => {
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
  it("clicking on 'sensors' icon and click close button, toggle the sensors panel", () => {
    cy.get("[data-cy=sensorsPanel]").should("be.hidden");
    cy.get("[data-cy=sensorsToggle]").click();
    cy.get("[data-cy=sensorsPanel]").should("not.be.hidden");
    cy.get("[data-cy=sensorsTogglePanel]").click();
    cy.get("[data-cy=sensorsPanel]").should("be.hidden");
  });
  it("clicking on 'expand' icon of 'sensors', expand and reduce the sensors panel", () => {
    cy.get("[data-cy=sensorsPanel]").should("be.hidden");
    cy.get("[data-cy=sensorsToggle]").click();
    cy.get("[data-cy=sensorsPanel]").should("not.be.hidden");
    cy.get("[data-cy=sensorsPanel]").should(
      "have.class",
      "side-panel__reduced"
    );
    cy.get("[data-cy=sensorsTogglePanelExpanded").click();
    cy.get("[data-cy=sensorsPanel]").should(
      "have.class",
      "side-panel__expanded"
    );
    cy.get("[data-cy=sensorsTogglePanelExpanded").click();
    cy.get("[data-cy=sensorsPanel]").should(
      "have.class",
      "side-panel__reduced"
    );
  });
  it("clicking on 'products' icon and click close button, toggle the products panel", () => {
    cy.get("[data-cy=productsPanel]").should("be.hidden");
    cy.get("[data-cy=productsToggle]").click();
    cy.get("[data-cy=productsPanel]").should("not.be.hidden");
    cy.get("[data-cy=productsTogglePanel]").click();
    cy.get("[data-cy=productsPanel]").should("be.hidden");
  });
  it("clicking on 'expand' icon of 'products', expand and reduce the products panel", () => {
    cy.get("[data-cy=productsPanel]").should("be.hidden");
    cy.get("[data-cy=productsToggle]").click();
    cy.get("[data-cy=productsPanel]").should("not.be.hidden");
    cy.get("[data-cy=productsPanel]").should(
      "have.class",
      "side-panel__reduced"
    );
    cy.get("[data-cy=productsTogglePanelExpanded").click();
    cy.get("[data-cy=productsPanel]").should(
      "have.class",
      "side-panel__expanded"
    );
    cy.get("[data-cy=productsTogglePanelExpanded").click();
    cy.get("[data-cy=productsPanel]").should(
      "have.class",
      "side-panel__reduced"
    );
  });
  it("clicking on 'filters' footer, toggle the filters panel", () => {
    cy.get("[data-cy=filtersPanel]").should(
      "have.class",
      "top-panel-body__reduced"
    );
    cy.get("[data-cy=filtersToggle]").click();
    cy.get("[data-cy=filtersPanel]").should(
      "have.class",
      "top-panel-body__expanded"
    );
    cy.get("[data-cy=filtersToggle]").click();
    cy.get("[data-cy=filtersPanel]").should(
      "have.class",
      "top-panel-body__reduced"
    );
  });
});
