(function(angular) {
  'use strict';
angular.module('docsSimpleDirective', [])
  .controller('Controller', ['$scope', function($scope) {
    $scope.customer = {
      name: 'Naomi',
      address: '1600 Amphitheatre'
    };
    
    $scope.buttonClickFunction = function(){
      $scope.customer.name = "John";
      $scope.customer.address = "Donerweg 45"
		}
			   
  }])
  .directive('myCustomer', function() {
    return {
      template: 'Name: {{customer.name}} Address: {{customer.address}}<br><input type="text" ng-model="customer.address" ng-trim="false">'
    };
  });
})(window.angular);