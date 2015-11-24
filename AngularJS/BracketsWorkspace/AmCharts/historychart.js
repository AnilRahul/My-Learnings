'use strict';
var historyChartDirective = angular.module('directive.historyChart', []);

historyChartDirective
		.directive(
				'historyChart',
				function($http, $filter) {
					var chart;
					var sensorId;
					var maxNumerOfDataPoints = 800;
					var minimumDifference = 15000; // minimum interval

					return {

						templateUrl : 'app/templates/historyChart.html',
						scope : {
							sensorId : '@',
							start : '@',
							end : '@'
						},
						restrict : 'E',
						replace : true,
						controller : function($scope, $rootScope) {
							$scope.format = 'yyyy-MM-dd HH:mm';
							$scope.today = function() {
								var startDate = new Date();
								startDate.setHours(0);
								startDate.setMinutes(0);

								var endDate = new Date();

								$scope.startDate = $filter('date')(startDate,
										$scope.format);
								$scope.endDate = $filter('date')(endDate,
										$scope.format);
							};
							$scope.today();

							$scope.onStartTimeSet = function(newDate, oldDate) {
								$scope.startDate = $filter('date')(newDate, $scope.format);
							};

							$scope.onEndTimeSet = function(newDate, oldDate) {
								$scope.endDate = $filter('date')(newDate, $scope.format);
							};

							// callback when sensor is loaded -> hides invalid
							// values from graph
							$scope.$on('initHistoryChart',function(event, sensor) {
												$scope.dataLoaded = false;
												$scope.loading = false;

												$scope.showHistoryData = function() {
													// calculates the new
													// interval
													var timeDifference = event.endDate - event.startDate;
													// the minimum interval is
													// 10 seconds.
													var calculatedDifference = 0;
													if (timeDifference < minimumDifference) {
														calculatedDifference = minimumDifference - timeDifference;
													}

													// converts the client time
													// to the server time
													var server_startDate = $scope.startDate;
													var server_endDate = $scope.endDate;

													var config = {
														method : 'GET',
														url : '/sen/api/v1/metrics/testsensor',
														headers : {}
													};
													$http(config)
															.success(
																	function(
																			data,
																			status,
																			headers,
																			config) {
																		updateData(data);

																		$scope.dataLoaded = true;
																	})
															.error(
																	function(
																			data,
																			status,
																			headers,
																			config) {
																		$scope.dataLoaded = false;
																		$scope
																				.$emit(
																						'errorloadinghistoricdata',
																						'alert-danger',
																						'MESSAGE_ERROR_LOADING_HISTORY_DATA');
																	});

													function updateData(data) {
														chart.dataProvider = [];
														for (var i = 0; i < data.length; i++) {
															var sensordata = $scope.metaMetricInformation
																	.parse(
																			data[i],
																			data[i].id,
																			data[i].received,
																			'',
																			data[i].data);
															sensordata.received = new Date(
																	data[i].received);
															chart.dataProvider
																	.push(sensordata);
														}

														chart.validateData();
														chart.invalidateSize();

													}
												};

												var periodSelector = new AmCharts.PeriodSelector();
												periodSelector.position = 'bottom';
												periodSelector.periods = [ {
													period : 'DD',
													count : 1,
													label : '1 days'
												}, {
													period : 'MM',
													selected : true,
													count : 1,
													label : '1 month'
												}, {
													period : 'YYYY',
													count : 1,
													label : '1 year'
												}, {
													period : 'YTD',
													label : 'YTD'
												}, {
													period : 'MAX',
													label : 'MAX'
												} ];

												// graph
												var graphElements = [];
												var valueAxesElements = [];
												var offset = 0;
												var position = 'right';

												chart = AmCharts
														.makeChart(
																'chartDiv',
																{
																	'color' : '#ffffff',
																	'type' : 'serial',
																	'theme' : 'none',
																	'pathToImages' : 'images/amCharts/',
																	'dataDateFormat' : 'YYYY-MM-DD-H-N-S',
																	'numberFormatter' : {
																		precision : 3,
																		decimalSeparator : '.',
																		thousandsSeparator : ','
																	},
																	'legend' : {
																		'color' : '#ffffff',
																		divId : 'legend_history',
																		fontSize : 13
																	},
																	dataProvider : [],
																	'graphs' : [ {
																		'id' : 'g1',
																		'valueAxis' : 'g1',
																		'bullet' : 'round',
																		'bulletBorderAlpha' : 1,
																		'bulletColor' : '#ff6d2d',
																		'bulletSize' : 5,
																		'hideBulletsCount' : 50,
																		'lineColor' : '#ff6d2d',
																		'lineThickness' : 2,
																		'title' : 'X',
																		'useLineColorForBulletBorder' : true,
																		'valueField' : 'a_magnitude'
																	} ],
																	'chartScrollbar' : {
																		'graph' : 'g1',
																		'scrollbarHeight' : 50
																	},
																	'chartCursor' : {
																		'cursorPosition' : 'mouse'
																	},
																	'responsive' : {
																		'enabled' : true,
																		'addDefaultRules' : true
																	},
																	'categoryField' : 'received',
																	'categoryAxis' : {
																		'parseDates' : true,
																		'position' : 'top',
																		'minPeriod' : 'ss'
																	},
																	'valueAxes' : [ {
																		'id' : 'g1',
																		'position' : 'left',
																		'unit' : 'm/s²',
																		'axisColor' : '#ff6d2d',
																		'axisThickness' : 2,
																		'gridAlpha' : 0,
																		'axisAlpha' : 1,
																		'offset' : 10,
																		'minimum' : 0,
																		'minMaxMultiplier' : 1.2
																	} ],
																	'periodSelector' : periodSelector
																});

												$(window).resize(function(e) {
													chart.invalidateSize();
												});

											});
						},
						link : function postLink(scope, element, attr,
								controller) {
							sensorId = attr.sensorId;
							element.bind('$destroy', function() {
								if (angular.isDefined(chart)) {
									chart.clear();
								}
							});
						}
					};
				});
