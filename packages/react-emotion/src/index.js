// @flow
import React from 'react'
import * as emotion from 'emotion'
import createEmotionStyled from 'create-emotion-styled'
import { createWithTheme, createThemeProvider } from 'emotion-theming'

export const withTheme = createWithTheme(React)
export const ThemeProvider = createThemeProvider(React)

export default createEmotionStyled(emotion, React)

export * from 'emotion'
