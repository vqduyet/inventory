module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'indent': 0,
    'space-before-function': 0,
    'space-before-function-paren': 0,
    'spaced-comment': 0,
    'no-multiple-empty-lines': 0,
    'no-unused-vars': 0,
    'no-extra-bind': 0,
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'padded-blocks': 0,
    'quotes': [1, 'single'],
    'semi': [1, 'never'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'eol-last': 0,
    'camelcase': 0,
    'no-tabs': 0,
    'no-mixed-spaces-and-tabs': 0,
    'key-spacing': 0,
    'handle-callback-err': 0,
    'eqeqeq': 0,
    'no-new': 1,
    'new-cap': 0,
    'no-trailing-spaces': 0,
    'vue/attribute-hyphenation': 0,
    'vue/attributes-order': 0,
    'vue/html-indent': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/max-attributes-per-line': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
