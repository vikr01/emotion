module.exports = {
  presets: [[require('../../../../babel-preset-emotion-test'), {emotion: false}]],
  plugins: [require('./babel-macros-register')]
}