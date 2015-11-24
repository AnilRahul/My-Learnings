var myApp = angular.module('myApp', ['ui.bootstrap']);

myApp.controller('myController', function ($scope) {
    
    $scope.step = 0;
    $scope.setTab = function(newTab){
              $scope.step = newTab;
            };

            $scope.isSet = function(tabNum){
              return $scope.step === tabNum;
            };
    
    $scope.displayName ="";

});