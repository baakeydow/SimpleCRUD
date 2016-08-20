'use strict';
import {UtilService} from './util.service';

export default angular.module('angularGeneratorApp.util', [])
  .factory('Util', UtilService)
  .name;
