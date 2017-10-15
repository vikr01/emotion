import { createElement as h, Component } from 'react'
import { css, keyframes, merge } from 'emotion'
import omit from 'lodash.omit' // forgive me

export default class Animate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cls: css(),
      prevStyle:
        typeof props.to === 'function'
          ? props.to(this.props, this.context)
          : props.to
    }
  }

  componentWillMount() {
    this.updateStyles(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.updateStyles(nextProps)
  }

  updateStyles = props => {
    if (!props.to) {
      return
    }
    const styleEntries = Object.entries(this.props.to || {})
    const nextStyleEntries = Object.entries(props.to || {})
    if (
      nextStyleEntries.some(
        ([key, value], i) =>
          styleEntries[i] &&
          (styleEntries[i][0] !== key || styleEntries[i][1] !== value)
      )
    ) {
      const {
        to: toProp,
        direction = 'normal',
        duration = '200ms',
        timing = 'ease',
        fillMode = 'forwards'
      } = props
      const style =
        typeof toProp === 'function' ? toProp(this.props, this.context) : toProp

      const name = keyframes({
        from: Object.assign({}, this.state.prevStyle),
        to: style
      })

      this.setState({
        cls: css(
          ...this.state.prevStyle,
          { animationName: name },
          duration && {
            animationDuration: duration
          },
          timing && {
            animationTimingFunction: timing
          },
          direction && {
            animationDirection: direction
          },
          fillMode && {
            animationFillMode: fillMode
          }
        ),
        prevStyle: style
      })
    }
  }

  render() {
    const { cls } = this.state
    const { className, tag } = this.props
    return h(
      tag,
      Object.assign(
        {},
        omit(this.props, [
          'className',
          'tag',
          'to',
          'direction',
          'fillMode',
          'timing'
        ]),
        {
          className: merge([className, cls].filter(Boolean).join(' '))
        }
      )
    )
  }
}
