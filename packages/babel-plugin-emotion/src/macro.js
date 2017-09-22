import { replaceCssWithCallExpression } from './index'
import { buildMacroRuntimeNode, addRuntimeImports } from './babel-utils'
import { createMacro } from 'babel-macros'

module.exports = createMacro(macro)

function macro({ references, state, babel: { types: t } }) {
  if (!state.inline) state.inline = true
  Object.keys(references).forEach(referenceKey => {
    if (referenceKey === 'injectGlobal') {
      references.injectGlobal.forEach(injectGlobalReference => {
        const path = injectGlobalReference.parentPath
        const runtimeNode = buildMacroRuntimeNode(
          injectGlobalReference,
          state,
          'injectGlobal',
          t
        )
        if (
          t.isIdentifier(path.node.tag) &&
          t.isTemplateLiteral(path.node.quasi)
        ) {
          replaceCssWithCallExpression(
            path,
            runtimeNode,
            state,
            t,
            undefined,
            true
          )
        } else {
          injectGlobalReference.replaceWith(runtimeNode)
        }
      })
    } else if (referenceKey === 'fontFace') {
      references.fontFace.forEach(fontFaceReference => {
        const path = fontFaceReference.parentPath
        const runtimeNode = buildMacroRuntimeNode(
          fontFaceReference,
          state,
          'fontFace',
          t
        )

        if (
          t.isIdentifier(path.node.tag) &&
          t.isTemplateLiteral(path.node.quasi)
        ) {
          replaceCssWithCallExpression(
            path,
            runtimeNode,
            state,
            t,
            undefined,
            true
          )
        } else {
          fontFaceReference.replaceWith(runtimeNode)
        }
      })
    } else if (referenceKey === 'css') {
      references.css.forEach(cssReference => {
        const path = cssReference.parentPath
        const runtimeNode = buildMacroRuntimeNode(cssReference, state, 'css', t)
        if (
          t.isIdentifier(path.node.tag) &&
          t.isTemplateLiteral(path.node.quasi)
        ) {
          replaceCssWithCallExpression(path, runtimeNode, state, t)
        } else {
          path.addComment('leading', '#__PURE__')
          cssReference.replaceWith(runtimeNode)
        }
      })
    } else if (referenceKey === 'keyframes') {
      references.keyframes.forEach(keyframesReference => {
        const path = keyframesReference.parentPath
        const runtimeNode = buildMacroRuntimeNode(
          keyframesReference,
          state,
          'keyframes',
          t
        )
        if (
          t.isIdentifier(path.node.tag) &&
          t.isTemplateLiteral(path.node.quasi)
        ) {
          replaceCssWithCallExpression(path, runtimeNode, state, t)
        } else {
          path.addComment('leading', '#__PURE__')
          keyframesReference.replaceWith(runtimeNode)
        }
      })
    } else {
      references[referenceKey].forEach(reference => {
        reference.replaceWith(
          buildMacroRuntimeNode(reference, state, referenceKey, t)
        )
      })
    }
  })
  addRuntimeImports(state, t)
}
