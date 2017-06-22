module.exports = {
    "extends": "airbnb",
    "plugins": [
        "jsx-a11y",
        "import"
    ],
    "parser": "babel-eslint",
    "rules": {
      "comma-dangle": ["error", "never"],
      "array-bracket-spacing": ["error", "always"],
      "object-curly-spacing": ["error", "always"],
      "computed-property-spacing": ["error", "always"],
      "space-in-parens": ["error", "always"],
      "semi": [ "error", "never" ],
      "no-underscore-dangle": "off",
      "class-methods-use-this": 0,
      "template-curly-spacing": ["error", "always"],
    }
};
