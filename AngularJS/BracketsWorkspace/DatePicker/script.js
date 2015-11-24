(function(angular) {
  'use strict';
angular.module('datePickerDirective', ['daterangepicker'])
  .controller('datePickerController', ['$scope', function($scope) {
   
      /**
           * Date Range Selection Configuration for the notifications tab
           */
          $scope.dr = {};
          $scope.dr.date = {
            startDate: moment().subtract(49, 'days'),
            endDate: moment()
          };
          $scope.dr.dateOptions = {
            opens: 'right',
            ranges: {
              'Today': [moment(), moment()],
              'Last 3 Days': [moment().subtract(3, 'days'), moment()],
              'Last 7 Days': [moment().subtract(7, 'days'), moment()],
              'Last 96 Days': [moment().subtract(96, 'days'), moment()]
            },
            timePicker: true,
            timePickerIncrement: 1,
            format: 'MM/DD/YYYY h:mm A'
          };

          $scope.$watch('dr.date', function(event, args) {
            if ($scope.dr.date.startDate && $scope.dr.date.endDate) {
              var from = $scope.dr.date.startDate.valueOf();
              var to = $scope.dr.date.endDate.valueOf();
              console.log("From : " + moment(from).format("DD-MM-YYYY"));
                console.log("To :" + moment(to).format("DD-MM-YYYY"));
            }
          });
      
      $scope.open = function(){
           $scope.opened = true;
      };
      
      
      
			   
  }]);
})(window.angular);