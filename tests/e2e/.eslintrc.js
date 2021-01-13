module.exports = {
  plugins: ["cypress", "chai-friendly"],
  env: {
    mocha: true,
    "cypress/globals": true
  },
  extends: ["plugin:cypress/recommended", "plugin:chai-friendly/recommended"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    strict: "off",
    "jest/no-hooks": [
      "error",
      {
        allow: ["afterEach", "afterAll", "beforeEach", "beforeAll"]
      }
    ]
  },
  overrides: [
    {
      files: ["specs/*.spec.js"],
      rules: {
        "jest/valid-expect": 0,
        "chai-friendly/no-unused-expressions": 2,
        "jest/prefer-expect-assertions": 0,
        "jest/expect-expect": 0
      }
    }
  ]
};
