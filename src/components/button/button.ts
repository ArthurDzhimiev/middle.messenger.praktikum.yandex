import Handlebars from 'handlebars/dist/handlebars.runtime';
import template from './button.hbs';
import './button.scss';

Handlebars.registerPartial(
  'button',
  template
);
