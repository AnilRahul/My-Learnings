//camel cased directive name
   //in your HTML, this will be named as bars-chart
angular.module('myBarApp', []).
directive('barsChart', function ($parse,$http,$window) {
     //explicitly creating a directive definition variable
     //this may look verbose but is good for clarification purposes
     //in real life you'd want to simply return the object {...}

    var directiveDefinitionObject = {
         //We restrict its use to an element
         //as usually  <bars-chart> is semantically
         //more understandable
    
        restrict: 'E',
        
        //this is important,
         //we don't want to overwrite our directive declaration
         //in the HTML mark-up
        
        replace: false,
        
        //our data source would be an array
         //passed thru chart-data attribute
        
        scope: {data: '=chartData'},
        link: function (scope, element, attrs) {
        
        var margin = {top: 20, right: 30, bottom: 30, left: 40},
            wwWidth = document.getElementsByClassName("chart")[0].clientWidth,
            /*wwHeight = document.getElementsByClassName("chart")[0].clientHeight,*/
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

        var y = d3.scale.linear()
        .range([height, 0]);

        var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

        var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

        var chart = d3.select(".chart")
        /*.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)*/
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 960 500")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        d3.json("data.json", function(data) {
        x.domain(data.map(function(d) { return d.month; }));
        y.domain([0, d3.max(data, function(d) { return d.total_cars; })]);

        chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

        chart.append("g")
        .attr("class", "y axis")
        .call(yAxis);

        chart.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.month); })
        .attr("y", function(d) { return y(d.total_cars); })
        .attr("height", function(d) { return height - y(d.total_cars); })
        .attr("width", x.rangeBand());
            
            
/*var aspect = 960 / 500 ;
var myWindow = angular.element($window);
myWindow.on("resize", function() {
    var targetWidth = chart.parent().width();
    chart.attr("width", targetWidth);
    chart.attr("height", targetWidth / aspect);
});*/
            
            
            
});

        
            
        } 
      };
      return directiveDefinitionObject;
   });

function barCtrl($http,$scope) {
    $scope.myData =[];

    //$scope.myData = [10,20,30,40,60, 80, 20, 50];
}