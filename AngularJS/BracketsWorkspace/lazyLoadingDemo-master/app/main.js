/**
 * app entry point. loads al the main files nedded for
 * the application to start and bootstrap the application main module
 */

require.config({

    paths: {
        'angular': 'components/angular/angular.min',
        'angular-route': 'components/angular-route/angular-route.min',
        'route-resolver' : 'resources/core/routeResolver',
        'oc-lazy-load' : 'resources/core/ocLazyLoad',
        'app' : 'app'
    }
});

require(['angular', 'angular-route', 'route-resolver','oc-lazy-load','app'], function () {

    angular.bootstrap(document, ['App']);
});