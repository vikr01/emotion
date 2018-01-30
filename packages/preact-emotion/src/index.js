import _preact from 'preact'
import * as emotion from 'emotion'
import createEmotionStyled from 'create-emotion-styled'
import { createWithTheme, createThemeProvider } from 'emotion-theming'

const preact = {
  ..._preact,
  Children: {
    only: children => children[0]
  }
}

export const withTheme = createWithTheme(preact)
export const ThemeProvider = createThemeProvider(preact)

export default createEmotionStyled(emotion, preact)

export * from 'emotion'
