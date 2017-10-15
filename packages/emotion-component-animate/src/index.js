import { createElement as h, Component } from 'react'
import { css, keyframes, merge } from 'emotion'

export default class Animate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cls: css()
    }

    this.styleEntries = Object.entries(props.styles)
    this.prevStyle =
      typeof props.style === 'function'
        ? props.style(this.props, this.context)
        : props.style
  }

  componentWillMount() {
    this.updateStyles(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.updateStyles(nextProps)
  }

  updateStyles = props => {
    const nextStyleEntries = Object.entries(props.style)
    if (
      nextStyleEntries.some(
        ([key, value], i) =>
          this.styleEntries[i][0] !== key || this.styleEntries[i][1] !== value
      )
    ) {
      const { style: styleProp, duration, timing } = props
      const style =
        typeof styleProp === 'function'
          ? styleProp(this.props, this.context)
          : styleProp

      const name = keyframes({
        from: this.prevStyle,
        to: style
      })

      this.setState({
        cls: css(
          { animationName: name },
          duration && { animationDuration: duration },
          timing && { animationTimingFunction: timing }
        )
      })

      this.prevStyle = style
      this.styleEntries = nextStyleEntries
    }
  }

  render() {
    const { cls } = this.state
    const { className, tag } = this.props
    return h(
      tag,
      Object.assign({}, this.props, {
        className: merge([className, cls].filter(Boolean).join(' '))
      })
    )
  }
}
