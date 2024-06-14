/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    "plugin:vue/vue3-strongly-recommended",
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
    //"prettier"
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: "module",
  },
  plugins: ["vue", "html", "prettier"],
 /* rules: {
    "prettier/prettier": "error", 
  },*/
}
