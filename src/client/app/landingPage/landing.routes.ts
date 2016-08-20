'use strict';


export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('landing', {
      url: '/',
      template: require('./landing.html')
    });
};
