// import { cssKitPlugin } from "./tailwind/css-kit-plugin";
import { cssKitPlugin,cssKitThemeExtension } from "@akeso/tailwind-css-kit-plugin";
import formsPlugin from "@tailwindcss/forms";
import acpectPlugin from "@tailwindcss/aspect-ratio";
import typographyPlugin from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./node_modules/@akeso/**/*.{js,mjs,cjs}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: cssKitThemeExtension(),
    typography: ({ theme }) => ({
      app: {
        css: {
          '--tw-prose-body': theme('colors.app.text.base'),
          '--tw-prose-headings': theme('colors.app.text.strong'),
          '--tw-prose-lead': theme('colors.app.text.base'),
          '--tw-prose-links': theme('colors.app.text.link'),
          '--tw-prose-bold': theme('colors.app.text.base'),
          '--tw-prose-counters': theme('colors.app.text.base'),
          '--tw-prose-bullets': theme('colors.app.text.base'),
          '--tw-prose-hr': theme('colors.app.border.base'),
          '--tw-prose-quotes': theme('colors.app.text.weak'),
          '--tw-prose-quote-borders': theme('colors.app.border.base'),
          '--tw-prose-captions': theme('colors.app.text.weaker'),
          '--tw-prose-code': theme('colors.app.text.weak'),
          '--tw-prose-pre-code': theme('colors.app.text.base'),
          '--tw-prose-pre-bg': theme('colors.app.surface.lowered'),
          '--tw-prose-th-borders': theme('colors.app.border.base'),
          '--tw-prose-td-borders': theme('colors.app.border.base'),
          '--tw-prose-invert-body': theme('colors.app.text.base'),
          '--tw-prose-invert-headings': theme('colors.app.text.strong'),
          '--tw-prose-invert-lead': theme('colors.app.text.base'),
          '--tw-prose-invert-links': theme('colors.app.text.link'),
          '--tw-prose-invert-bold': theme('colors.app.text.base'),
          '--tw-prose-invert-counters': theme('colors.app.text.base'),
          '--tw-prose-invert-bullets': theme('colors.app.text.base'),
          '--tw-prose-invert-hr': theme('colors.app.border.base'),
          '--tw-prose-invert-quotes': theme('colors.app.text.weak'),
          '--tw-prose-invert-quote-borders': theme('colors.app.border.base'),
          '--tw-prose-invert-captions': theme('colors.app.text.weaker'),
          '--tw-prose-invert-code': theme('colors.app.text.base'),
          '--tw-prose-invert-pre-code': theme('colors.app.text.base'),
          '--tw-prose-invert-pre-bg': theme('colors.app.surface.lowered'),
          '--tw-prose-invert-th-borders': theme('colors.app.border.base'),
          '--tw-prose-invert-td-borders': theme('colors.app.border.base'),
        }
      }
    }),
  },
  plugins: [formsPlugin, acpectPlugin, typographyPlugin, cssKitPlugin],
};

export default config;
