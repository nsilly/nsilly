module.exports = {
  verbose: true,
  testURL: 'http://localhost',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)(spec|test).js?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/routes/'],
  modulePathIgnorePatterns: ['/dist/']
};
