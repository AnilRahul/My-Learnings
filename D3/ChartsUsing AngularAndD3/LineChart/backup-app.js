var app = angular.module('chartApp', []);

app.controller('SalesController', ['$scope','$interval', function($scope, $interval){
   $scope.salesData =[];
    /*$scope.salesData=[
        {hour: 1,sales: 54},
        {hour: 2,sales: 66},
        {hour: 3,sales: 77},
        {hour: 4,sales: 70},
        {hour: 5,sales: 60},
        {hour: 6,sales: 63},
        {hour: 7,sales: 55},
        {hour: 8,sales: 47},
        {hour: 9,sales: 55},
        {hour: 10,sales: 30}
    ];*/

  /* $interval(function(){
        var m = moment();
        var monthRandom ; 
       if(monthRandom >11)
       {
           $scope.salesData.length = 0;
       }
       monthRandom = $scope.salesData.length +1;
       
        //var month= m.months(monthRandom).format('MMM');
        var month= monthRandom;
        var total_cars= Math.round(Math.random() * 100);
        $scope.salesData.push({month: month, total_cars:total_cars});
    }, 1000, 10);*/
    
}]);

app.directive('linearChart', function($parse, $window ,$http){
   return{
      restrict:'EA',
      template:"<svg width='850' height='200'></svg>",
       link: function(scope, elem, attrs){
           
           
           
            $http.get('data.json').
			then(function(response) {
			console.log("line Chart response :"+response);	
                scope.salesData = response.data;
            
           //var m = moment();   
                
                var margin = { top: 20, right: 60, bottom: 30, left: 50 },
                width = 1000 - margin.left - margin.right,
                height = 300 - margin.top - margin.bottom;
                                          
           var exp = $parse(attrs.chartData);

           var salesDataToPlot=exp(scope);
           var padding = 20;
           var pathClass="path";
           var xScale, yScale, xAxisGen, yAxisGen, lineFun;

           var d3 = $window.d3;
           var rawSvg=elem.find('svg');
           var svg = d3.select(rawSvg[0]);
                
            var monthNumber = d3.time.format("%-m");
            var monthName = d3.time.format("%B");


            for (i = 0; i < salesDataToPlot.length; i++) {
                
                var mon = monthNumber.parse((salesDataToPlot[i].month+1).toString());
                salesDataToPlot[i].month = monthName(mon);
            }    

           scope.$watchCollection(exp, function(newVal, oldVal){
               salesDataToPlot=newVal;
               redrawLineChart();
           });

           function setChartParameters(){

               xScale = d3.scale.linear()
                   .domain([salesDataToPlot[0].month, salesDataToPlot[salesDataToPlot.length-1].month])
                   .range([padding + 5, rawSvg.attr("width") - padding]);

               yScale = d3.scale.linear()
                   .domain([0, d3.max(salesDataToPlot, function (d) {
                       return d.total_cars;
                   })])
                   .range([rawSvg.attr("height") - padding, 0]);

               xAxisGen = d3.svg.axis()
                   .scale(xScale)
                   .orient("bottom");
                   /*.ticks(d3.time.months)
                   .tickFormat(d3.time.format("%B"));*/

               yAxisGen = d3.svg.axis()
                   .scale(yScale)
                   .orient("left")
                   .ticks(5);

               lineFun = d3.svg.line()
                   .x(function (d) {
                       return xScale(d.month);
                   })
                   .y(function (d) {
                       return yScale(d.total_cars);
                   })
                   .interpolate("basis");
           }
         
         function drawLineChart() {

               setChartParameters();

               svg.append("svg:g")
                   .attr("class", "x axis")
                   .attr("transform", "translate(0," + height + ")")
                   .call(xAxisGen);

               svg.append("svg:g")
                   .attr("class", "y axis")
                   .attr("transform", "translate(20,0)")
                   .call(yAxisGen);

               svg.append("svg:path")
                   .attr({
                       d: lineFun(salesDataToPlot),
                       "stroke": "blue",
                       "stroke-width": 2,
                       "fill": "none",
                       "class": pathClass
                   });
           }

           function redrawLineChart() {

               setChartParameters();

               svg.selectAll("g.y.axis").call(yAxisGen);

               svg.selectAll("g.x.axis").call(xAxisGen);

               svg.selectAll("."+pathClass)
                   .attr({
                       d: lineFun(salesDataToPlot)
                   });
           }

                
           drawLineChart();
            }, function(response) {
            console.log("error");
         });
                
       }
   };
});