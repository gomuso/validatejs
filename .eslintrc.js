module.exports = {
    "extends": "airbnb",
    "env": {
      "jest": true
    },
    "plugins": [
        "jsx-a11y",
        "import"
    ],
    "parser": "babel-eslint",
    "rules": {
      "comma-dangle": ["error", "never"],
      "semi": [ "error", "never" ],
      "no-underscore-dangle": "off",
      "class-methods-use-this": 0
    }
};
