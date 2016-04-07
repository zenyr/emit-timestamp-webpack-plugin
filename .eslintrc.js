module.exports = {
  "parser": "babel-eslint",
  "env": {
    "node": true,
    "es6": true
  },
  "ecmaFeatures": {
    "modules": true
  },
  "extends": "airbnb",
  "plugins": [
    // "react"
  ],
  "globals": {
    "_": false
  },
  "rules": {
    "max-len": [ 1, 200, 4, {
      "ignoreUrls": true
    } ],
    "array-bracket-spacing": [ 1, "always" ],
    "object-curly-spacing": [ 1, "always", {
      "objectsInObjects": false
    } ],
    "func-names": 0,
    "vars-on-top": 0,
    "space-in-parens": 0,
    "space-before-function-parens": 0,
    "eqeqeq": 0,
    "computed-property-spacing": [ 2, "always" ],
    "spaced-comment": [ 2, "always", {
      "exceptions": [ "-", "+", "/", "@" ],
      "markers": [ "/", "@constr", "@pure" ]
    } ],
    "no-param-reassign": 0,
    // "react/prop-types": 1,
    // "react/prefer-stateless-function": 0,
    // "react/self-closing-comp": 1
  }
}
