module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js'],
  testEnvironment: 'node',
  verbose: true,
  transform: {
    "^.+\\.js?$": "babel-jest"
  },
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
}
