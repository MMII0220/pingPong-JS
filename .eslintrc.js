module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
  },
  'extends': 'google',
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
  },
  'rules': {
  },
  'max-len':
    ['error',
      {'ignoreComments': true,
      }],
  // "require": {
  //   "require-jsdoc": ["error", {
  //       "require": {
  //           "FunctionDeclaration": true,
  //           "MethodDefinition": false,
  //           "ClassDeclaration": false,
  //           "ArrowFunctionExpression": false,
  //           "FunctionExpression": false
  //       }
  //   }]
  // }
};
