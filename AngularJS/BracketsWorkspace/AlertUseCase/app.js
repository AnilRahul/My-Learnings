var myApp = angular.module('myApp', ['ui.bootstrap']);

myApp.controller('myController', function ($scope) {
    
    $scope.tableRowExpanded = false;
    $scope.tableRowIndexExpandedCurr = "";
    $scope.tableRowIndexExpandedPrev = "";
    $scope.eventIdExpanded = "";
    
    $scope.dayDataCollapseFn = function () {
        $scope.dayDataCollapse = [];
        for (var i = 0; i < $scope.eventDataModel.events.length; i += 1) {
            $scope.dayDataCollapse.push(false);
        }
    };
    
       
    $scope.selectTableRow = function (index, eventId) {
        if (typeof $scope.dayDataCollapse === 'undefined') {
            $scope.dayDataCollapseFn();
        }

        if ($scope.tableRowExpanded === false && $scope.tableRowIndexExpandedCurr === "" && $scope.eventIdExpanded === "") {
            $scope.tableRowIndexExpandedPrev = "";
            $scope.tableRowExpanded = true;
            $scope.tableRowIndexExpandedCurr = index;
            $scope.eventIdExpanded = eventId;
            $scope.dayDataCollapse[index] = true;
        } else if ($scope.tableRowExpanded === true) {
            if ($scope.tableRowIndexExpandedCurr === index && $scope.eventIdExpanded === eventId) {
                $scope.tableRowExpanded = false;
                $scope.tableRowIndexExpandedCurr = "";
                $scope.eventIdExpanded = "";
                $scope.dayDataCollapse[index] = false;
            } else {
                $scope.tableRowIndexExpandedPrev = $scope.tableRowIndexExpandedCurr;
                $scope.tableRowIndexExpandedCurr = index;
                $scope.eventIdExpanded = eventId;
                $scope.dayDataCollapse[$scope.tableRowIndexExpandedPrev] = false;
                $scope.dayDataCollapse[$scope.tableRowIndexExpandedCurr] = true;
            }
        }

    };

    $scope.eventDataModel = {
    "events": [{
        "data": {
                "id": "1",
                "name": "Camera1",
                "type": "image",
                "fileLocation" : "http://www.hdwallpapersonly.com/wp-content/uploads/2013/04/Rose-Flower-1.jpg",
            }
        }, {
               "data": {
                "id": "2",
                "name": "Video1",
                "type": "video",
                "fileLocation" : "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
            }
        }, {
            "data": {
                "id": "3",
                "name": "Ipod1",
                "type": "music",
                "fileLocation" : "resources/content/tum_hi_ho.mp3",
            }
        }, {
            "data": {
                "id": "4",
                "name": "Camera2",
                "type": "image",
                "fileLocation" : "http://www.hdwallpapersonly.com/wp-content/uploads/2013/04/Rose-Flower-4.jpg",
            }
        }, {
            "data": {
                "id": "5",
                "name": "Video2",
                "type": "video",
                "fileLocation" : "http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_20mb.mp4",
            }
        }, {
            "data": {
               "id": "6",
                "name": "Ipod2",
                "type": "music",
                "fileLocation" : "http://topgaana.com/music/movies-starts-from-a/aashiqui_2_2013/topgaana.com_tum_hi_ho.mp3",
            }
        }]
    };

});