import _preact from 'preact'
import * as emotion from 'emotion'
import createEmotionStyled from 'create-emotion-styled'

const preact = {
  ..._preact,
  Children: {
    only: children => children[0]
  }
}

export default createEmotionStyled(emotion, preact)

export * from 'emotion'
