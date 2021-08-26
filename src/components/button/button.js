import Handlebars from 'handlebars/dist/handlebars'
import template from './button.tmpl'
import './button.scss'
Handlebars.registerPartial(
  "button",
  template
)
