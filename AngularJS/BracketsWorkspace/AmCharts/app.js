(function() {
    'use strict';

    /**
     * @ngdoc overview
     * @name rb-ui-seed
     * @description This is the root-module.
     */
    angular.module('rb-ui-seed', [
        'ui.router',
        'rb-ui-core',

        'demo-module-1',
        'demo-module-2',
        'demo-module-3',
        
        'directive.historyChart'
    ])
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            'rbNavElementsProvider',
            function($stateProvider, $urlRouterProvider, rbNavElementsProvider) {
                console.log(rbNavElementsProvider);
                $stateProvider
                    .state('rbApp', {
                        abstract: true,
                        url: '/{language}',
                        template: '<ui-view />'
                    });

                $urlRouterProvider.otherwise('en/module-1');
            }]);
}());

var senDeviceServices = angular.module('senDeviceServices', ['ngResource']);

senDeviceServices.factory('SenDevices', ['$resource',
  function($resource){
    return $resource('/sen/api/v1/devices/:deviceId',{deviceId: '@deviceId'});
  }]);

