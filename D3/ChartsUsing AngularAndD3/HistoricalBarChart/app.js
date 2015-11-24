angular.module('historicApp', []).

directive('historicChart', ['$http', function ($http) {
    var directiveDefinitionObject = {
        restrict: 'E',
        replace: false,       
        link: function (scope, element, attrs) {

            
    $http.get("data.json").
    then(function(response) {
      console.log("Data from a Json file "+response.data);
        
          var historicalBarChart = response.data;
        
                nv.addGraph({
                    generate: function(){
                        var chart = nv.models.multiBarChart()
                        .x(function(d) { return d.month })
                        .y(function(d) { return d.total_cars })
                        .stacked(true)
                        ;

                        d3.select('#chart1 svg')
                        .datum(historicalBarChart)
                        .call(chart);

                        nv.utils.windowResize(chart.update);

                        return chart;
                }
                });
        
         }, function(response) {
			console.log("error");
        });
            } 
      };
      return directiveDefinitionObject;
   }]);