
var mainApp = angular.module('mainApp',[]);
/*angular.module('mainApp',['mainApp.controllers','mainApp.factory']);*/

	  // You have seen this using $scope. this is another way
      mainApp.value("defaultInput", 5);
	  mainApp.constant("test_blabla", "Hello");