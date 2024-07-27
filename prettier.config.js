/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  useTabs: false,
  tabWidth: 2,
  endOfLine: 'lf',
  semi: true,
  singleAttributePerLine: true,
  singleQuote: true,
  tailwindConfig: './tailwind.config.ts',
  jsxSingleQuote: false,

  plugins: [
    'prettier-plugin-organize-imports',
    'prettier-plugin-organize-attributes',
    'prettier-plugin-css-order',
    'prettier-plugin-tailwindcss',
  ],
};

export default config;
