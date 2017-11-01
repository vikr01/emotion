import { css, inserted, registered, flush } from 'emotion'

function insertSomeCss() {
  const flex = css`
    display: flex;
  `
  css(`color: hotpink`, flex)
}

describe('state', () => {
  test('local caches are the same as global', () => {
    insertSomeCss()
    expect(registered).toBe(global.__SECRET_EMOTION__.registered)
    expect(inserted).toBe(global.__SECRET_EMOTION__.inserted)
  })
  test('local caches are the same as global after flush', () => {
    insertSomeCss()
    expect(registered).toBe(global.__SECRET_EMOTION__.registered)
    expect(inserted).toBe(global.__SECRET_EMOTION__.inserted)
    flush()
    insertSomeCss()
    expect(registered).toBe(global.__SECRET_EMOTION__.registered)
    expect(inserted).toBe(global.__SECRET_EMOTION__.inserted)
  })
  test('different instances use the same caches', () => {
    jest.resetModules()
    const emotion1 = require('emotion')
    jest.resetModules()
    const emotion2 = require('emotion')
    expect(emotion1.css).not.toBe(emotion2.css)
    expect(emotion1.inserted).toBe(emotion2.inserted)
    expect(emotion1.registered).toBe(emotion2.registered)
  })
})
