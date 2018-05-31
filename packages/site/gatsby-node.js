const path = require('path')
// // const docs = require('./docs-yaml')()
// // const packages = docs.filter(({ title }) => title === 'Packages')[0].items
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin
// global.Babel = require('babel-standalone')

exports.onCreateWebpackConfig = ({
  config,
  stage,
  actions,
  plugins,
  getConfig
}) => {
  actions.setWebpackConfig({
    plugins: [plugins.ignore(/^(xor|props)$/)],
    resolve: {
      modules: ['node_modules'],
      alias: {
        'react-hot-loader$': path.join(
          __dirname,
          './src/utils/fake-react-hot-loader'
        ),
        'react-hot-loader.development.js': 'fbjs/lib/emptyFunction',
        'react-hot-loader/patch.js': 'fbjs/lib/emptyFunction',
        'react-hot-loader.development': 'fbjs/lib/emptyFunction',
        'react-hot-loader/patch': 'fbjs/lib/emptyFunction',

        assert: 'fbjs/lib/emptyFunction',
        'source-map': 'fbjs/lib/emptyFunction',
        '@babel/types': path.join(__dirname, './src/utils/babel-types'),
        'buble/dist/buble.deps': path.join(__dirname, './src/utils/transform')
      }
    },
    node: {
      fs: 'empty',
      buffer: 'empty',
      assert: 'empty'
    }
  })
  if (stage === 'develop') {
    actions.replaceWebpackConfig({})
  }
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      plugins: [
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          generateStatsFile: true
        })
      ]
    })
  }
}

exports.onCreateBabelConfig = ({ actions, stage }) => {
  actions.setBabelPreset({
    name: `@babel/preset-react`,
    stage,
    options: {
      useBuiltIns: true,
      pragma: `___EmotionJSX`,
      development: stage === `develop`
    }
  })
  actions.setBabelPlugin({
    name: 'babel-plugin-jsx-pragmatic',
    stage,
    options: {
      export: 'jsx',
      module: '@emotion/core',
      import: '___EmotionJSX'
    }
  })
  actions.setBabelPlugin({
    name: '@emotion/babel-plugin-core',
    stage,
    options: {
      jsx: true,
      sourceMap: stage === 'develop'
    }
  })
}

// exports.createPages = async ({ graphql, boundActionCreators }) => {
//   const { createPage } = boundActionCreators
//   const docs1 = require('./docs-yaml')()
//   const docTemplate = require.resolve(`./src/templates/doc.js`)
//   docs1.forEach(({ title, items }) => {
//     items.forEach(itemName => {
//       createPage({
//         path: `docs/${itemName}`,
//         component: docTemplate,
//         context: {
//           slug: itemName
//         }
//       })
//     })
//   })
// }

// // Add custom url pathname for blog posts.
// exports.onCreateNode = async ({
//   node,
//   boundActionCreators,
//   getNode,
//   loadNodeContent
// }) => {
//   const { createNodeField } = boundActionCreators

//   if (
//     node.internal.type === `MarkdownRemark` &&
//     typeof node.slug === `undefined`
//   ) {
//     const fileNode = getNode(node.parent)

//     const splitAbsolutePath = fileNode.absolutePath.split(path.sep)
//     createNodeField({
//       node,
//       name: `slug`,
//       value:
//         fileNode.name === 'README'
//           ? splitAbsolutePath[splitAbsolutePath.length - 2]
//           : fileNode.name
//     })
//   }
// }
