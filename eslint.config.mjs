import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import  cspellESLintPluginRecommended from '@cspell/eslint-plugin/recommended';


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  cspellESLintPluginRecommended
];