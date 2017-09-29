require('babel-register')({
  presets: [
    [
      'env',
      {
        loose: true,
        exclude: ['transform-es2015-typeof-symbol']
      }
    ],
    'stage-0',
    'react',
    'flow'
  ],
  babelrc: false
})
const path = require('path')
require('module-alias').addAliases({
  'emotion-utils': path.join(__dirname, '../../../emotion-utils/src'),
  'react-emotion/macro': path.join(
    __dirname,
    '../../../babel-plugin-emotion/src/macro-styled'
  ),
  'emotion/macro': path.join(
    __dirname,
    '../../../babel-plugin-emotion/src/macro'
  )
})

module.exports = require('babel-macros')
