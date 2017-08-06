import { stringify, parse } from 'css'
import { injectGlobal, sheet, flush, css } from '../src/index'

const getCss = () =>
  stringify(parse(sheet.tags.map(tag => tag.textContent || '').join('')))

describe('injectGlobal', () => {
  afterEach(() => {
    flush()
  })
  test('static', () => {
    injectGlobal`
      html {
        background: pink;
      }
      html.active {
        background: red;
      }
    `
    expect(getCss()).toMatchSnapshot()
  })
  test('interpolation', () => {
    const color = 'yellow'
    injectGlobal`
      body {
        color: ${color};
        margin: 0;
        padding: 0;
      }
    `
    expect(getCss()).toMatchSnapshot()
  })
  test('composition', () => {
    const style = css`
      background-color: hotpink;
      &:hover {
        background-color: palevioletred;
      }
    `
    injectGlobal`
      html {
        background: pink;
      }
      html.active {
        color: green;
        ${style};
      }
    `
    console.log(sheet.tags.map(tag => tag.textContent || '').join(''))
    expect(getCss()).toMatchSnapshot()
  })
})
