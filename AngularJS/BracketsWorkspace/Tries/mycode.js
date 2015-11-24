 var app = angular.module('myApp',['ngComboBox']);
 
  app.controller('myCtrl', function($scope,$http) {
  $scope.firstName = "Noni";
  $scope.lastName = "Munni";
  $scope.applicationTitle = "Welcome to the world of dummies";
  $scope.applicationSubTitle = "Hope you like this tutorial";
 
 $scope.checkboxVM = {
       isFavoriteCountry : true,
       areYouAdmin : 'an'
     };
	 
  
  $scope.fullName= function(){
     return $scope.firstName + " " + $scope.lastName;
   }
   
   $scope.buttonClickFunction = function(){
	   $scope.countFromCode = $scope.countFromCode + 1;
	   alert("Increment to " + $scope.countFromCode);
   }
  
   $scope.names = [
        {state:'Jani',country:'Norway'},
        {state:'Hege',country:'Sweden'},
        {state:'Kai',country:'Denmark'}
    ];
	
	$http.get("http://www.w3schools.com/angular/customers.php")
    .success(function(response) {
		$scope.customers = response.records;
		$scope.selectedCustomer = response.records[0];
	});
	
	


  });
  
  
 
  