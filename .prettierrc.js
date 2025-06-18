/** @type {import('prettier').Config} */
const config = {
  arrowParens: "always",
  bracketSpacing: true,
  endOfLine: "lf",
  jsxBracketSameLine: false,
  jsxSingleQuote: false,
  overrides: [
    {
      files: "*.md",
      options: {
        parser: "markdown",
        proseWrap: "always",
        printWidth: 80,
        singleQuote: false,
        quoteProps: "preserve",
      },
    },
  ],
  printWidth: 120,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
  plugins: [
    // "prettier-plugin-prisma",
    "prettier-plugin-tailwindcss",
  ],
};

export default config;