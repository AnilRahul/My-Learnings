//inject the value in the controller using its name "CalcController". Look at the test_blabla
angular.module('mainApp').controller('CalcController', function($scope, SquareService, defaultInput) {
            $scope.x = defaultInput;	
            $scope.result = SquareService.sqare($scope.x);
            
            $scope.square = function() {
            $scope.result = SquareService.square($scope.x);
         }
    
      });