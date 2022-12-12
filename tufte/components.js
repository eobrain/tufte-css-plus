import { label, input, span, pre, code } from './ez-html-elements/index.js'

/* global HTMLElement customElements */

let nextId = 0

class TufteCode extends HTMLElement {
  connectedCallback () {
    this.innerHTML = pre(code(removeIndent(this.innerHTML)))
  }
}

class TufteSidenote extends HTMLElement {
  connectedCallback () {
    const id = `id${nextId++}`
    this.innerHTML =
      label({ for: id }, ['margin-toggle', 'sidenote-number']) +
      input({ type: 'checkbox', id }, ['margin-toggle']) +
      span(['sidenote'], this.innerHTML)
  }
}

class TufteMarginnote extends HTMLElement {
  connectedCallback () {
    const id = `id${nextId++}`
    this.innerHTML =
      label({ for: id }, ['margin-toggle'], '&#8853;') +
      input({ type: 'checkbox', id }, ['margin-toggle']) +
      span(['marginnote'], this.innerHTML)
  }
}

class TufteNewThought extends HTMLElement {
  connectedCallback () {
    this.innerHTML = span(['newthought'], this.innerHTML)
  }
}

class TufteSubtitle extends HTMLElement {
  connectedCallback () {
    this.innerHTML = p(['subtitle'], this.innerHTML)
  }
}

const BIG = 99999
function findIndent (line) {
  if (line.length === 0) {
    return BIG
  }
  if (line[0] !== ' ') {
    return 0
  }
  return 1 + findIndent(line.slice(1))
}

function removeIndent (code) {
  code = code.replace(/^ *\n/, '').replace(/\n *$/, '')
  const lines = code.split('\n')
  const n = lines.length
  let minIndent = BIG
  for (let i = 0; i < n; ++i) {
    const indent = findIndent(lines[i])
    if (indent < minIndent) {
      minIndent = indent
    }
  }
  for (let i = 0; i < n; ++i) {
    if (lines[i].length >= minIndent) {
      lines[i] = lines[i].slice(minIndent)
    }
  }
  return lines.join('\n')
}

customElements.define('t-marginnote', TufteMarginnote)
customElements.define('t-newthought', TufteNewThought)
customElements.define('t-sidenote', TufteSidenote)
customElements.define('t-subtitle', TufteSubtitle)
customElements.define('t-code', TufteCode)
