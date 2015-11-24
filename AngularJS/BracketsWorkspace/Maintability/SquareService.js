 //create a factory "MathService" which provides a method multiply to return multiplication of two numbers
angular.module('mainApp').factory('SquareService',['MathService', function(MathService) {     
         var factory = {};  
         factory.square = function(a) {
            return MathService.multiply(a,a); 
         }
         return factory;
      }]); 