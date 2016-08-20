'use strict';


export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('board', {
      url: '/board',
      template: '<board></board>',
	  authenticate: true
    });
};
