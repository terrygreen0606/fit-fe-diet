module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/dot-notation': 1,
    '@typescript-eslint/no-unused-vars': 1,
    'jsx-a11y/label-has-associated-control': 1,
    'import/prefer-default-export': 1,
    'max-len': 1,
    'no-underscore-dangle': 1,
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    'react/jsx-props-no-spreading': 1,
    'linebreak-style': 0,
    'jsx-quotes': [2, 'prefer-single'],
    'import/prefer-default-export': 'off',
    'react/self-closing-comp': 'off',
    'no-plusplus': 'off',
    'implicit-arrow-linebreak': 'off',
  },
};
