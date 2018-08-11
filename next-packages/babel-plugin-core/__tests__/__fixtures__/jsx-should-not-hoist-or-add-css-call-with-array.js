/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const SomeComponent = props => (
  <div
    css={[
      {
        color: props.color
      },
      {
        backgroundColor: props.backgroundColor
      }
    ]}
    {...props}
  />
)
