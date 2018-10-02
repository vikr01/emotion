// @flow
import findRoot from 'find-root'
import memoize from '@emotion/memoize'
import nodePath from 'path'
import hashString from '@emotion/hash'

let hashArray = (arr: Array<string>) => hashString(arr.join(''))

const unsafeRequire = require

const getPackageRootPath = memoize(filename => findRoot(filename))

export function getTargetClassName(state: *, t: *) {
  if (state.emotionTargetClassNameCount === undefined) {
    state.emotionTargetClassNameCount = 0
  }

  const filename = state.file.opts.filename
  // normalize the file path to ignore folder structure
  // outside the current node project and arch-specific delimiters
  let moduleName = ''
  let rootPath = filename

  try {
    rootPath = getPackageRootPath(filename)
    moduleName = unsafeRequire(rootPath + '/package.json').name
  } catch (err) {}

  const finalPath =
    filename === rootPath ? 'root' : filename.slice(rootPath.length)

  const positionInFile = state.emotionTargetClassNameCount++

  const stuffToHash = [moduleName]

  if (finalPath) {
    stuffToHash.push(
      nodePath.normalize(finalPath).replace(new RegExp(nodePath.sep, 'g'), '/')
    )
  } else {
    stuffToHash.push(state.file.code)
  }

  console.log('\n\n\n\n\n\n\n')
  console.log({ stuffToHash })
  console.log('\n\n\n\n\n\n\n')

  const stableClassName = `e${hashArray(stuffToHash)}${positionInFile}`

  return stableClassName
}
