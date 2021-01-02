module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '(/tests/.*|(\\.|/)test)\\.ts$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
}