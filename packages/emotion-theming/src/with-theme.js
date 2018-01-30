// @flow
// @jsx ReactLike.createElement

import typeof ReactType from 'react'
import type { ComponentType } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { channel, contextTypes } from './utils'

type Props = { theme: Object }

export const createWithTheme = (ReactLike: ReactType) => (
  Component: ComponentType<Props>
) => {
  class WithTheme extends ReactLike.Component<{}, { theme: Object }> {
    unsubscribeId: number
    componentWillMount() {
      const themeContext = this.context[channel]
      if (themeContext === undefined) {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.error(
            '[withTheme] Please use ThemeProvider to be able to use withTheme'
          )
        }
        return
      }
      this.unsubscribeId = themeContext.subscribe(theme => {
        this.setState({ theme })
      })
    }

    componentWillUnmount() {
      if (this.unsubscribeId !== -1) {
        this.context[channel].unsubscribe(this.unsubscribeId)
      }
    }

    render() {
      // eslint-disable-next-line react/react-in-jsx-scope
      return <Component theme={this.state.theme} {...this.props} />
    }
  }
  WithTheme.displayName = `WithTheme(${Component.displayName ||
    Component.name ||
    'Component'})`
  WithTheme.contextTypes = contextTypes

  return hoistNonReactStatics(WithTheme, Component)
}
