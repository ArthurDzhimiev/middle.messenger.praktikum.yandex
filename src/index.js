import Handlebars from 'handlebars/dist/handlebars'
import  './components/button'
import template from './index.tmpl'

document.addEventListener('DOMContentLoaded', () => {
  const compiled = Handlebars.compile(template)
  const html = compiled()
  document.body.innerHTML = html
})
