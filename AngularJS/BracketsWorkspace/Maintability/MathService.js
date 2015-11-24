 //create a factory "MathService" which provides a method multiply to return multiplication of two numbers
angular.module('mainApp').factory('MathService', function() {     
         var factory = {};  
         factory.multiply = function(a, b) {
            return a * b; 
         }
         return factory;
      }); 