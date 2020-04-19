module.exports = {
  env: {
    commonjs: true,
    es6: true,
    browser: true,
  },
  extends: [
    "airbnb-base/legacy",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    sourceType: "module",
  },
  rules: {
  }
};
