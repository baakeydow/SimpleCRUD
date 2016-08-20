'use strict';
import routes from './landing.routes';

export default angular.module('angularGeneratorApp.landing', [
  'ui.router'
])
  .config(routes)
  .name;
