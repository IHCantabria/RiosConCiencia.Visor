import { resolutionLon, resolutionHours } from "../filters";

describe("filters", () => {
  it("filter resolutionLon", () => {
    expect.assertions(1);
    const lon = 15;
    expect(resolutionLon(lon)).toBe("15 Km");
  });

  it("filter resolutionHours", () => {
    expect.assertions(1);
    const hour = 2;
    expect(resolutionHours(hour)).toBe("2 h");
  });
});
