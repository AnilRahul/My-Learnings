/**
 * @ngdoc directive
 * @name directions
 * @description 
 *   Enable directions on map. e.g., origin, destination, draggable, waypoints, etc
 *   
 *   Requires:  map directive
 *
 *   Restrict To:  Element 
 *
 * @attr {String} DirectionsRendererOptions [Any DirectionsRendererOptions](https://developers.google.com/maps/documentation/javascript/reference#DirectionsRendererOptions)
 * @attr {String} DirectionsRequestOptions [Any DirectionsRequest options](https://developers.google.com/maps/documentation/javascript/reference#DirectionsRequest)
 * @example
 * Example: 
 *   <map zoom="14" center="37.7699298, -122.4469157">
 *     <directions 
 *       draggable="true"
 *       panel="directions-panel"
 *       travel-mode="{{travelMode}}"
 *       waypoints="[{location:'kingston', stopover:true}]"
 *       origin="{{origin}}"
 *       destination="{{destination}}">
 *     </directions>
 *   </map> 
 */
/* global google */
(function() {
  'use strict';

  var getDirectionsRenderer = function(options, events) {
    if (options.panel) {
      options.panel = document.getElementById(options.panel) || document.querySelector(options.panel);
    }
    var renderer = new google.maps.DirectionsRenderer(options);
    for (var eventName in events) {
      google.maps.event.addListener(renderer, eventName, events[eventName]);
    }
    return renderer;
  };

  var directions = function(Attr2Options, $timeout, NavigatorGeolocation) {
    var parser = Attr2Options;
    var directionsService = new google.maps.DirectionsService();

    var updateRoute = function(renderer, options) {
      /* filter out valid keys only for DirectionsRequest object*/
      var request = options;
      request.travelMode = request.travelMode || 'DRIVING';
      var validKeys = [
        'origin', 'destination', 'travelMode', 'transitOptions', 'unitSystem',
        'durationInTraffic', 'waypoints', 'optimizeWaypoints', 
        'provideRouteAlternatives', 'avoidHighways', 'avoidTolls', 'region'
      ];
      for(var key in request){
        (validKeys.indexOf(key) === -1) && (delete request[key]);
      }

      if(request.waypoints) {
        // Check fo valid values
        if(request.waypoints == "[]" || request.waypoints == "")  delete request.waypoints;
      }

      var showDirections = function(request) {
        console.log('request', request);
        directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            $timeout(function() {
              renderer.setDirections(response);
            });
          }
        });
      };

      if (request.origin && request.destination) {
        if (request.origin == 'current-location') {
          NavigatorGeolocation.getCurrentPosition().then(function(ll) {
            request.origin = new google.maps.LatLng(ll.coords.latitude, ll.coords.longitude);
            showDirections(request);
          });
        } else if (request.destination == 'current-location') {
          NavigatorGeolocation.getCurrentPosition().then(function(ll) {
            request.destination = new google.maps.LatLng(ll.coords.latitude, ll.coords.longitude);
            showDirections(request);
          });
        } else {
          showDirections(request);
        }
      } 
    };

    var linkFunc = function(scope, element, attrs, mapController) {
      var orgAttrs = parser.orgAttributes(element);
      var filtered = parser.filter(attrs);
      var options = parser.getOptions(filtered);
      var events = parser.getEvents(scope, filtered);
      var attrsToObserve = parser.getAttrsToObserve(orgAttrs);

      var renderer = getDirectionsRenderer(options, events);
      mapController.addObject('directionsRenderers', renderer);
      
      attrsToObserve.forEach(function(attrName) {
        (function(attrName) {
          attrs.$observe(attrName, function(val) {
            if (attrName == 'panel') {
              $timeout(function(){
                var panel = document.getElementById(val) || document.querySelector(val);
                console.log('setting ', attrName, 'with value', panel);
                panel && renderer.setPanel(panel);
              });
            } else if (options[attrName] !== val) { //apply only if changed
              var optionValue = parser.toOptionValue(val, {key: attrName});
              console.log('setting ', attrName, 'with value', optionValue);
              options[attrName] = optionValue;
              updateRoute(renderer, options);
            }
          });
        })(attrName);
      });

      scope.$on('mapInitialized', function(event, map) {
        updateRoute(renderer, options);
      });
      scope.$on('$destroy', function(event, map) {
        mapController.deleteObject('directionsRenderers', renderer);
      });
    };
    
    return {
      restrict: 'E',
      require: '^map',
      link: linkFunc
    }
  }; // var directions
  directions.$inject = ['Attr2Options', '$timeout', 'NavigatorGeolocation'];

  angular.module('ngMap').directive('directions', directions);
})();