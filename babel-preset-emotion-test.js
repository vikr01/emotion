module.exports = options => {
  const config = {
    presets: [
      require.resolve('babel-preset-flow'),
      [
        require.resolve('babel-preset-env'),
        {
          loose: true,
          exclude: ['transform-es2015-typeof-symbol']
        }
      ],
      require.resolve('babel-preset-react'),
      require.resolve('babel-preset-stage-2')
    ],
    plugins: []
  }
  if (options.emotion !== false) {
    config.plugins.push(require.resolve('./babel-plugin-emotion-test'))
  }
  if (options.macro !== false) {
    config.plugins.push(require.resolve('babel-macros'))
  }
  return config
}
