'use strict';

/*
1.AngularJS modules define AngularJS applications.
2.Module acts as a container for the different parts of your app – controllers, services, filters, directives, etc.*/

 var sampleApp = angular.module('graphApp',[]);
 
/*
1. a. AngularJS lets you extend HTML with new attributes called Directives.
	  AngularJS directives are extended HTML attributes with the prefix ng-.
   Ex:
	The ng-app directive initializes an AngularJS application.

	The ng-init directive initializes application data.

	The ng-model directive binds the value of HTML controls (input, select, textarea) to application data.
	
   b. At a high level, directives are markers on a DOM element (such as an attribute, element name, comment or CSS class) that tell AngularJS's HTML compiler ($compile) to attach a specified behavior to that DOM element (e.g. 	via event listeners), or even to transform the DOM element and its children.	

2. Here we are injecting barChart module ( using morris.js) into our application.

3. The $http service is a core Angular service that facilitates communication with the remote HTTP servers via the browser's XMLHttpRequest object or via JSONP.

4. Scope is the glue between application controller and the view. During the template linking phase the directives set up $watch expressions on the scope. The $watch allows the directives to be notified of property changes, which allows the directive to render the updated value to the DOM.

*/
 
 sampleApp.directive('barChart', ['$http',function($http){
	  
	 return{
		 
		 restrict :'E',  						/*Element Directive*/
		 template:'<div></div>',				/*Curently to map into div in html*/
		 replace : true,						/*The element to which the directive is being applied should be replaced (replace: true) / remain(replace = false ) by the directive's template.*/ 
		 
		 link : function($scope, element, attrs){
			  var data = $scope[attrs.data],
			     xkey = $scope[attrs.xkey],
				 ykeys = $scope[attrs.ykeys],
				 labels = $scope[attrs.labels];
			
			/*The attributes data, xkey, ykeys, labels are api's available in morris.
			Please refer : http://morrisjs.github.io/morris.js/bars.html */	
	
				$http.get('data.json').
  then(function(response) {
	  console.log("Bar Chart response :"+response);
      Morris.Bar({                                   /*Invoking Bar Chart Api using morris.js*/ 
				element : element,					/*The ID of (or a reference to) the element into which to insert the graph.*/
				data : response.data,				/*The data to plot. This is an array of objects, containing x and y attributes as described by the xkey and ykeys options. */
				xkey : xkey,                        /*A string containing the name of the attribute that contains X labels.*/
				ykeys: ykeys,						/*A list of strings containing names of attributes that contain Y values (one for each series of data to be plotted)..*/
				labels : labels,                    /*A list of strings containing labels for the data series to be plotted (corresponding to the values in the ykeys option).*/
				resize:true,                       /* For responsiveness*/
				barColors:["#c7254e"]              /* Array containing colors for the series bars.*/
			});	
	
	 
	 
  }, function(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
	console.log("error");
  });				
			 
		 }

	 };
	 
 }]);
 
 
 
 sampleApp.directive('lineChart', ['$http',function($http){
	 
	  return{
		 
		 restrict :'E',              
		 template:'<div></div>',     
		 replace : true,             
		 
		 link : function($scope, element, attrs){
			 
			 var data = $scope[attrs.data],
			 
				 xkey = $scope[attrs.xkey],
				 ykeys = $scope[attrs.ykeys],
				 labels = $scope[attrs.labels];
			
		$http.get('data.json').
			then(function(response) {
			console.log("line Chart response :"+response);			

			Morris.Line({
								
				element : element,
				data : response.data,
				xkey : xkey,
				ykeys: ykeys,
				labels : labels,
				parseTime:false,   /*Set to false to skip time/date parsing for X values, instead treating them as an equally-spaced series.*/
				resize:true,
				lineColors :["#31C0BE"]
				
			});	
				}, function(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
	console.log("error");
  });					 
		 }

	 };
	 
	 
 }]);
 
 /*
 
 1. In Angular, a Controller is defined by a JavaScript constructor function that is used to augment the Angular Scope.
	When a Controller is attached to the DOM via the ng-controller directive, Angular will instantiate a new Controller object, using the specified Controller's constructor function. A new child scope will be created and made available as an injectable parameter to the Controller's constructor function as $scope.

 2. AngularJS controllers control the data of AngularJS applications.
	AngularJS controllers are regular JavaScript Objects.
	The ng-controller directive defines the application controller.
 
 */
  sampleApp.controller('graphController', function($scope){
    	
	/*Creating x and y titles to access from json file. Lables to display it on graph*/	
		
	$scope.xkey = 'month';
	
	$scope.ykeys = ['total_cars'];
	
	$scope.labels = ['Total Cars'];
	
	var jsontemp;
	
	
	//Reference : Hard coded data
	
	/*$scope.points = [
		{ month: 'January', total_cars: 65},
		{ month: 'Febraury', total_cars: 35},
		{ month: 'March', total_cars: 20},
		{ month: 'April', total_cars: 40},
		{ month: 'May', total_cars: 50},
		{ month: 'June', total_cars: 30},
		{ month: 'July', total_cars: 45},
		{ month: 'August', total_cars: 25},
		{ month: 'September', total_cars: 40},
		{ month: 'October', total_cars: 60},
		{ month: 'November', total_cars: 70},
		{ month: 'December', total_cars: 85}

	  ];	  
		console.log($scope.points);
	*/
     
	});

	
	
	
	