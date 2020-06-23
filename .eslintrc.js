module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/recommended", "@vue/prettier","plugin:promise/recommended","plugin:jest/all"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "jest/no-hooks": [
      "error",
      {
        "allow": ["afterEach", "afterAll", "beforeEach", "beforeAll"]
      },
    ],
    "jest/prefer-inline-snapshots": "off",
    "jest/prefer-called-with": "off"
  },
  globals: {
    L: true, //Leaflet instance
  },
  // required to lint *.vue files
  plugins: ["prettier", "vue","promise","jest"],
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
    ecmaVersion: 2019
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        "jest/globals": true,
        jest: true
      }
    }
  ]
};
