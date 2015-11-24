var app = angular.module('carApp',[]);


app.provider('CarProvider', function(){
    var dealerName = "Bad";
 this.$get = function(){
     return function(numCy1) {
      this.numCylinder = numCy1;
      this.dealer = dealerName;   
     }
 };
    
    this.setDealerName = function(newDealerName) {
        dealerName = newDealerName;
    }
    
});
    
app.service('CarService', function(){

    return function(cy1) {
        this.dealer = "Bad";
        this.numCylinder = cy1;
    }
});

    
app.factory('CarFactory', function(){
 return{
     dealer :"Bad",
     numCylinder : 3
 };
});

app.config(function(CarProviderProvider){
CarProviderProvider.setDealerName('Good');
});

app.controller('CarController1', function($scope, CarProvider, CarService, CarFactory){
    $scope.provider = new CarProvider(10);
    $scope.service = new CarService(8);
    $scope.factory = CarFactory;
});


app.controller('CarController2', function($scope, CarProvider, CarService, CarFactory){
    $scope.provider = new CarProvider(3);
    $scope.service = new CarService(9);
    $scope.factory = CarFactory;
});

