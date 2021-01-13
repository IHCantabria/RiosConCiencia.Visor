module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
    ecmaVersion: 2020
  },
  env: {
    node: true
  },
  extends: [
    "plugin:vue/recommended",
    "@vue/prettier",
    "plugin:promise/recommended",
    "plugin:jest/all",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:prettier/recommended"
  ],
  globals: {
    L: true //Leaflet instance
  },
  // add your custom rules here
  rules: {
    // allow async-await
    "generator-star-spacing": "off",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "import/no-unresolved": "off",
    semi: 0,
    "prefer-const": 1,
    "prettier/prettier": "warn",
    "jest/no-hooks": [
      "error",
      {
        allow: ["afterEach", "afterAll", "beforeEach", "beforeAll"]
      }
    ],
    "jest/prefer-inline-snapshots": "off",
    "jest/prefer-called-with": "off"
  },
  // required to lint *.vue files, jest files, imports and promises
  plugins: ["prettier", "vue", "promise", "jest", "import"],
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
