module.exports = {
  singleQuote: true,
  trailingComma: 'none',
  arrowParens: 'always',
  semi: false,
  bracketSameLine: false,
  jsxSingleQuote: false,
  arrayBracketSpacing: true,
  printWidth: 100,
  proseWrap: 'always',
  quoteProps: 'as-needed',
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      options: {
        // Add the object-curly-newline option to match your ESLint rule
        objectCurlyNewline: 'always',
        semi: false,
      },
    },
  ],
  plugins: ['prettier-plugin-tailwindcss'],
};
