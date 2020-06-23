module.exports = {
  root: true,
  "extends": [ "stylelint-config-standard","stylelint-config-prettier"],
  "plugins": [
    "stylelint-scss"
  ],
  "rules": {
    "selector-pseudo-class-no-unknown": [true, {
      "ignorePseudoClasses": ["global", "export", "import", "local"]
    }],
    "at-rule-empty-line-before": ["always",{"ignoreAtRules": ["else","if","include"]}],
    "block-no-empty": null,
    "declaration-no-important": true,
    "unit-whitelist": ["em", "rem", "%", "px", "vh", "vw", "fr", "s", "ms"],
    "selector-max-id": [0,{"severity": "warning"}],
    "selector-max-universal": [0,{"severity": "warning"}],
    "color-hex-length": null,
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "scss/at-else-empty-line-before":"never",
    "declaration-block-no-redundant-longhand-properties": true,
    "declaration-block-no-shorthand-property-overrides": true,
    "declaration-block-no-duplicate-properties": [true, {
      ignore: ["consecutive-duplicates","consecutive-duplicates-with-different-values"]
      }]
  }
}
