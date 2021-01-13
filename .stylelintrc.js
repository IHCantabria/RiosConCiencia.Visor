module.exports = {
  root: true,
  extends: [
    "stylelint-config-standard",
    "stylelint-config-standard-scss",
    "stylelint-prettier/recommended"
  ],
  plugins: ["stylelint-scss"],
  rules: {
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global", "export", "import", "local"]
      }
    ],
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep"]
      }
    ],
    "block-no-empty": null,
    // commented rule because vuesax styles forced us to use !important
    // "declaration-no-important": true,
    "unit-allowed-list": [
      "em",
      "rem",
      "%",
      "px",
      "vh",
      "vw",
      "fr",
      "s",
      "ms",
      "deg"
    ],
    "selector-max-id": [0, { severity: "warning" }],
    "selector-max-universal": [0, { severity: "warning" }],
    "color-hex-length": null,
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "scss/at-else-empty-line-before": "never",
    "declaration-block-no-redundant-longhand-properties": true,
    "declaration-block-no-shorthand-property-overrides": true,
    "declaration-block-no-duplicate-properties": [
      true,
      {
        ignore: [
          "consecutive-duplicates",
          "consecutive-duplicates-with-different-values"
        ]
      }
    ]
  }
};
