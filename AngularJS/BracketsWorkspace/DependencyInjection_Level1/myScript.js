
	//define a module.
	//on this obj, we can do many thigns like module.config(..), .service. .factory, 
      var mainApp = angular.module("mainApp", []);
	  
	  //provider is used by AngularJS internally to create services, factory etc. 
	  //during config phase(phase during which AngularJS bootstraps itself). 
	  //Below mention script can be used to create MathService that we've created earlier. 
	  //Provider is a special factory method with a method get() which is used to return the value/service/factory..
      mainApp.config(function($provide) {
         $provide.provider('MathService', function() {
            this.$get = function() {
               var factory = {};  
               factory.multiply = function(a, b) {
                  return a * b; 
               }
               return factory;
            };
         });
      });

	  // You have seen this using $scope. this is another way
      mainApp.value("defaultInput", 5);
	  mainApp.constant("test_blabla", "Hello");
	 
	  //create a factory "MathService" which provides a method multiply to return multiplication of two numbers
      mainApp.factory('MathService', function() {     
         var factory = {};  
         factory.multiply = function(a, b) {
            return a * b; 
         }
         return factory;
      }); 

	  //Create a service which defines a method square to return square of a number.
	  //Inject the factory "MathService" in a service to utilize the multiply method of factory.
	  //Remember : service is a singleton javascript object containing a set of functions to perform certain tasks. Services are defined using service() functions and then injected into controllers.
      mainApp.service('CalcService', function(MathService){
            this.square = function(a) { 
            return MathService.multiply(a,a); 
         }
      });


	  //inject the value in the controller using its name "CalcController". Look at the test_blabla
      mainApp.controller('CalcController', function($scope, CalcService, defaultInput,test_blabla) {
            $scope.number = defaultInput;
			$scope.test = test_blabla;
			
            $scope.result = CalcService.square($scope.number);

            $scope.square = function() {
            $scope.result = CalcService.square($scope.number);
         }
      });
